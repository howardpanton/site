
module.exports = function(grunt) {
    grunt.config('montage', {
      simple: {
            files: {
                "source/assets/img/sprite": [
                    "source/assets/img/sprite/ui-icons/*.png"
                ]
            }
        }

    });
      grunt.loadNpmTasks('grunt-montage');
};

