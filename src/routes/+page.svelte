<script>
	import background from '$lib/assets/tek.jpg';

	let { data } = $props();

	const imageFieldCandidates = [
		'image',
		'image_url',
		'img',
		'photo',
		'photo_url',
		'thumbnail',
		'picture'
	];
	const nameFieldCandidates = ['name', 'title', 'product_name'];
	const descriptionFieldCandidates = ['description', 'details', 'summary'];
	const priceFieldCandidates = ['price', 'cost', 'amount'];
	const staticImages = [
		'/2h-media-3q4V539j_bw-unsplash.jpg',
		'/c-d-x-PDX_a_82obo-unsplash.jpg',
		'/jp-lockwood-PsvmNr5SJdI-unsplash.jpg',
		'/petri-r-gehzL37x6zY-unsplash.jpg',
		'/ryan-spaulding-fJdEMpA83NM-unsplash.jpg'
	];

	function getFirstByKeys(row, keys) {
		for (const key of keys) {
			if (row?.[key] !== null && row?.[key] !== undefined && row?.[key] !== '') return row[key];
		}
		return null;
	}

	function getImage(row, index = 0) {
		const direct = getFirstByKeys(row, imageFieldCandidates);
		if (typeof direct === 'string' && direct.trim()) {
			const value = direct.trim();
			if (value.startsWith('/')) return value;
		}

		for (const value of Object.values(row ?? {})) {
			if (typeof value !== 'string') continue;
			const v = value.trim();
			if (!v) continue;
			if (v.startsWith('/')) return v;
		}

		return staticImages[index % staticImages.length];
	}

	function getName(row) {
		return getFirstByKeys(row, nameFieldCandidates) ?? 'Unnamed product';
	}

	function getDescription(row) {
		return getFirstByKeys(row, descriptionFieldCandidates) ?? 'No description available.';
	}

	function getPrice(row) {
		const value = getFirstByKeys(row, priceFieldCandidates);
		if (value === null) return null;
		const num = Number(value);
		if (!Number.isFinite(num)) return String(value);
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
	}
</script>

<svelte:head>
	<title>Electronic Devices</title>
	<meta name="description" content="A collection of electronic devices and gadgets." />
	<meta property="og:title" content="Electronic Devices" />
	<meta property="og:image" content={background} />
</svelte:head>

<header
	class="flex h-[500px] items-center justify-center bg-cover bg-center"
	style="background-image: url({background})"
>
	<h1 class="text-5xl">Electronic Devices</h1>
</header>

<main>
	<section class="mx-auto max-w-6xl px-4 py-8">
		{#if data.productsError}
			<p class="mb-4 text-red-700">Error loading products: {data.productsError}</p>
		{/if}

		<h2 class="mb-3 text-2xl font-bold">Products ({data.products?.length ?? 0})</h2>

		{#if data.products?.length}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.products as product, index (product.id ?? product.product_id ?? index)}
					<article class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
						<img
							src={getImage(product, index)}
							alt={getName(product)}
							class="h-56 w-full bg-gray-100 object-cover"
							loading="lazy"
						/>
						<div class="space-y-2 p-4">
							<h3 class="text-lg font-semibold">{getName(product)}</h3>
							<p class="line-clamp-3 text-sm text-gray-600">{getDescription(product)}</p>
							{#if getPrice(product)}
								<p class="text-base font-bold text-blue-900">{getPrice(product)}</p>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		{:else if data.dbConnected}
			<p>No products found in `products` table.</p>
		{/if}
	</section>
</main>

<footer class="flex h-[300px] items-center justify-center bg-blue-950 text-white">
	dgdygfryfu8fhi
</footer>
