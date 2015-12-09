var fs = require('fs');
var path = require('path');
var through = require('through2');
var xtend = require('xtend');

module.exports = function(options) {
  var opts = xtend({
    basepath: '',
    pattern: 'index.js'
  }, options);

  opts.debug && console.log('Injecting resources:');

  return through.obj(

    function(file, enc, callback) {

      if (file.isNull()) callback(null, file);

      var process = function(contents) {

        return contents.replace(opts.pattern, function(match, filepath) {

          var fp = path.join(opts.basepath, opts.pattern);

          try {
            var filecontents = fs.readFileSync(fp, { encoding: 'base64' });
            fs.unlinkSync(fp);
            return 'data:text/javascript;base64, ' + filecontents;
          }
          catch (e) {
            return opts.pattern;
          }
        });
      };

      if (file.isBuffer()) {
        file.contents = new Buffer(process(String(file.contents)));
        callback(null, file);
      } else if (file.isStream()) {
        file.contents.on('data', function(data) {
          file.contents = new Buffer(process(data));
          callback(null, file);
        });
      } else {
        callback(null, file);
      }
    }
  );
};
