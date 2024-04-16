<script>
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	export let open = false;
	export let title = 'Success';
	export let okText = 'Ok';
	export let bodyText;
	export let onOkClick = () => {};
	export let type = 'success';
</script>

<Dialog bind:open>
	<div id={type === 'success' ? 'success-dialog' : 'error-dialog'}>
		<Title style="text-align: left;">{title}</Title>
		<Content style="text-align: left;">{bodyText}</Content>
		<Actions>
			<Button on:click={onOkClick}>
				<Label>{okText}</Label>
			</Button>
		</Actions>
	</div>
</Dialog>

<style>
	#success-dialog {
		text-align: left;
		background-color: #dff0d8;
		color: #3c763d;
		border: 1px solid #d0e9c6;
		border-top: 6px solid #28a745;
	}
	#error-dialog {
		text-align: left;
		background-color: #f2dede;
		color: #a94442;
		border: 1px solid #ebccd1;
		border-top: 6px solid #dc3545;
	}
</style>
