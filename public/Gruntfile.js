module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      build_js: {
        src: ['components/ngd3.js', 'components/**/*.js'],
        dest: 'dist/ngd3.js'
      },
      build_css: {
        src: ['components/**/*.css'],
        dest: 'dist/ngd3.css'
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      target: {
        files: {
          'dist/ngd3.min.js': ['dist/ngd3.js']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/ngd3.min.css': ['dist/ngd3.css']
        }
      }
    }
  });

  // Load the plugin tasks(s).
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify:target','cssmin']);

};
