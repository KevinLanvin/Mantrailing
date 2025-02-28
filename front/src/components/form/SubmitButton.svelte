<script lang="ts">
  let { label, ...rest } = $props()
</script>

<button type="submit" class="submit-button" {...rest}>{label}</button>

<style lang="scss">
  @import '../../assets/styles/vars';

  .submit-button {
    background-color: $main-color-1;
    padding: 1.5rem;
    font-family: 'REM';
    width: 100%;
    border: none;
    border-radius: 10rem;
  }
</style>