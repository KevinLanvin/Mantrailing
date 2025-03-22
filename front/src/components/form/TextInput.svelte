<script lang="ts">
  let { value = $bindable(), ...rest } = $props()
</script>

<input {...rest} class="text-input" bind:value >

<style lang="scss">
  @import '../../assets/styles/vars';
  .text-input {
    width: 100%;
    border-radius: 5rem;
    border: 1px solid $neutral-color;
    padding: 1rem 1.5rem;
    background-color: transparent;
    color: $white;
    font-size: 1rem;
    font-family: 'REM';
  }
</style>