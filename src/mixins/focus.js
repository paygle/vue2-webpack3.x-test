export default function(ref) {
  return {
    methods: {
      focus() {
        if (!this.$refs[ref]) return; // ext-> add
        this.$refs[ref].focus();
      }
    }
  };
};
