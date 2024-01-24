<script>
  import {options} from '../store'
  import { onMount } from 'svelte';

  onMount(() => options.update(state => {
    return {
      ...state,
      temperature: 15,
    }
  }))
  // @ts-ignore
  const handleTemperatureChange = event => {
    options.update(state => {
      return {
        ...state,
        temperature: event.target.value
      }
    })
  }
</script>

<input type="range" id="temperature" name="temperature" min="-10" max="30" value="15" on:change={handleTemperatureChange} />
<label for="temperature">Température</label>