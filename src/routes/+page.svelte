<script>
	import DistancePicker from '../components/DistancePicker.svelte'
	import Geoloc from '../components/Geoloc.svelte'
	import Map from '../components/Map.svelte'
	import MoisturePicker from '../components/MoisturePicker.svelte'
	import Score from '../components/Score.svelte'
	import TemperaturePicker from '../components/TemperaturePicker.svelte'
	import WindDirectionPicker from '../components/WindDirectionPicker.svelte'
	import WindForcePicker from '../components/WindForcePicker.svelte'
</script>

<Map />
<Geoloc />
<Score />
<WindDirectionPicker />
<WindForcePicker />
<TemperaturePicker />
<MoisturePicker />
<DistancePicker />
