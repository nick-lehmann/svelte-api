<script>
import { loop_guard } from "svelte/internal";

	import { studentManager, Student } from "./student";
	import StudentComponent from "./Student.svelte";

	const promise = async function() {
		await studentManager.init()
	}() 

	function addStudent(event) {
		const [name, age] = [event.target.name.value, event.target.age.value];
		const newStudent = new Student({ name, age });
		console.log(`[Component] Creating `, newStudent);
		studentManager.add(newStudent);
	}
</script>

{#await promise}
	<p>Loading...</p>
{:then data}
	<ul>
		{#each Object.entries($studentManager) as [id, student] (id)}
			<li>
				<StudentComponent bind:student />
			</li>
		{/each}
	</ul>

	<h2>Add new student</h2>

	<form on:submit|preventDefault={addStudent}>
		<p>Name: <input type="text" name="name" /></p>
		<p>Alter: <input type="text" name="age" /></p>
		<button type="submit">Create account</button>
	</form>

	<button on:click={() => studentManager.remove(2)}>Delete two</button>

	<button on:click={() => console.log('DEBUG:', $studentManager[2])}>Log 2</button>
{:catch}
	<p>Failed loading students</p>
{/await}