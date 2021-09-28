<script lang="ts">
    import type { Writable } from 'svelte/store'
    import type { Student} from './student'
    export let student: Writable<Student>
</script>

<p>ID: {$student.id}</p>
<input type="text" bind:value={$student.name} />
<input type="text" bind:value={$student.age} />