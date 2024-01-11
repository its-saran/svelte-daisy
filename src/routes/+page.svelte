<script>
    import { goto } from '$app/navigation';

    const goToApp = () => {
        goto('/talk')
    }
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 id="heading" class="text-5xl font-bold">Hey, I'm Daisy!</h1>
        <p id="description" class="py-6">Your AI English coach for effortless spoken language improvement. Let's make learning fun!
        </p>
        <button class="btn btn-primary" on:click={goToApp}>Get Started</button>
      </div>
    </div>
</div>