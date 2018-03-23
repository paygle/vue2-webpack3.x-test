"use strict";

exports.__esModule = true;

exports.default = function (ref) {
  return {
    methods: {
      focus: function focus() {
        if (!this.$refs[ref]) return; // ext-> add
        this.$refs[ref].focus();
      }
    }
  };
};

;