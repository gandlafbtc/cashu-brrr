<script lang="ts">
	import { onMount } from 'svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';

	export let denomination: number;
	export let mintUrl: string;
	export let token: string;

	$: imageURL = '';

	let mintUrlChunks = Array<string>();

	mintUrlChunks = mintUrl.match(/(.{1,12})/g) ?? [];

	onMount(() => {
			imageURL = document.getElementById('qr-' + token).toDataURL();
	});

	const downloadNote = async (e) => {
		const svg = e.target.nearestViewportElement;
		const xml = new XMLSerializer().serializeToString(svg);
		const svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
		var a = document.createElement('a'); //Create <a>
		a.href = 'data:image/svg+xml;base64,' + svg64; //Image Base64 Goes here
		a.download = 'Image.png'; //File name Here
		a.click(); //Downloaded file
	};
</script>

<div class="invisible h-0">
	<QRCodeImage text={token} scale={3} displayType="canvas" displayID="qr-{token}" />
</div>

<button class="w-full" on:click={(e) => downloadNote(e)}>
	<svg
		class="w-full"
		width="748.0899"
		zoomAndPan="magnify"
		viewBox="0 0 561.06743 242.31738"
		height="323.08984"
		preserveAspectRatio="xMidYMid meet"
		version="1.0"
		id="cashu-bank-note-svg-{token}"
	>
		<defs id="defs17">
			<rect x="53.3112" y="60.166667" width="53.012587" height="50.610093" id="rect317017" />
			<rect x="65.951307" y="67.34936" width="39.7558" height="34.158968" id="rect302491" />
			<rect x="65.264894" y="68.544307" width="40.442214" height="32.964022" id="rect263303" />
			<rect x="536.59359" y="32.33108" width="108.2624" height="124.25225" id="rect74702" />
			<rect x="546.56889" y="47.825468" width="106.64782" height="113.67164" id="rect53378" />
			<clipPath id="3f610dd0ff">
				<path
					d="M 15.421875,179.26562 H 794.85547 V 509.19141 H 15.421875 Z m 0,0"
					clip-rule="nonzero"
					id="path2"
				/>
			</clipPath>
			<clipPath id="b41faa365e">
				<path d="m 611,323 h 30.95312 v 81 H 611 Z m 0,0" clip-rule="nonzero" id="path5" />
			</clipPath>
			<clipPath id="9ba27fb232">
				<path
					d="m 640.72266,403.76172 -9.39454,-0.13672 c 0.26172,-0.95313 0.33204,-2.01172 -0.125,-3.14844 -0.18359,-0.42969 -0.40234,-0.80859 -0.67187,-1.13672 l 10.08984,-21.51953 0.0586,14.41406 c -0.15235,-0.043 -0.3125,-0.0781 -0.47266,-0.11718 -0.51172,-0.0937 -0.98437,-0.14453 -1.42969,-0.14453 -6.57031,0 -6.55468,10.01953 -0.85937,10.54296 0.3125,0.0312 0.61328,0.0469 0.90234,0.0469 0.69922,0 1.32813,-0.082 1.89453,-0.22656 l 0.008,1.42578 m -26.65235,-5.12891 c -0.1875,0 -0.38672,-0.0195 -0.59765,-0.0664 l 0.41015,-70.27344 -2.24609,-4.58203 29.6914,0.20312 c 0,0 -0.28515,21.11719 -0.48828,21.11719 -0.008,0 -0.0156,-0.0234 -0.0156,-0.0664 -0.21094,-1.42187 -8.44141,-19.82812 -8.44141,-19.82812 l -10.57812,0.40234 0.61328,35.29688 9.45312,-10.07032 -0.30468,21.96875 -8.84375,-9.86328 -0.0547,22.31641 c -0.6211,-0.28125 -1.27735,-0.41406 -1.9336,-0.41406 -3.45703,0 -6.91015,3.63672 -4.55078,7.80468 1.36328,2.41797 0.26953,6.05469 -2.11328,6.05469"
					clip-rule="nonzero"
					id="path8"
				/>
			</clipPath>
			<clipPath id="c13de10a5c">
				<path
					d="m 170.19141,262 h 141.71484 v 16 H 170.19141 Z m 0,0"
					clip-rule="nonzero"
					id="path11"
				/>
			</clipPath>
			<clipPath id="5ede4b21f2">
				<path
					d="m 310.76953,277.625 c 0,0 -140.00391,0 -140.41016,-0.60938 -0.41015,-0.60546 0.30469,-5.23437 0.30469,-5.23437 0,0 19.38281,-0.0273 43.75391,-0.0273 41.20703,0 96.66406,0.0664 96.76172,0.3789 0.15234,0.50781 -0.41016,5.49219 -0.41016,5.49219 m -52.03516,-9.12109 c -5.66015,0 -10.42187,-0.0234 -12.83593,-0.082 -8.63672,-0.20312 -59.42969,0.0508 -59.67578,-0.91796 -0.25391,-0.96875 -1.07032,-4.83204 -0.50782,-5.39063 0.74219,-0.0312 4.21485,-0.043 9.48828,-0.043 26.32422,0 97.58204,0.34766 99.19141,0.34766 1.9375,0 2.64453,5.39453 0.81641,5.69922 -1.31641,0.21875 -21.8711,0.38672 -36.47657,0.38672"
					clip-rule="nonzero"
					id="path14"
				/>
			</clipPath>
			<clipPath id="65456aac5f">
				<path
					d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
					clip-rule="nonzero"
					id="path4588"
				/>
			</clipPath>
			<clipPath id="69488bb349">
				<path
					d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4591"
				/>
			</clipPath>
			<clipPath id="b46a85b818">
				<path
					d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4594"
				/>
			</clipPath>
			<clipPath id="931287b357">
				<path
					d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4597"
				/>
			</clipPath>
			<clipPath id="9f8d5c6b67">
				<path
					d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4600"
				/>
			</clipPath>
			<clipPath id="a131c9c548">
				<path
					d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4603"
				/>
			</clipPath>
			<clipPath id="57e398e083">
				<path
					d="M 395.26172,483.99609 H 587 v 24 H 395.26172 Z m 0,0"
					clip-rule="nonzero"
					id="path4606"
				/>
			</clipPath>
			<clipPath id="a3a57048de">
				<path d="m 492,483.99609 h 82 v 24 h -82 z m 0,0" clip-rule="nonzero" id="path4609" />
			</clipPath>
			<clipPath id="ca3eef3423">
				<path
					d="m 528,483.99609 h 191.26172 v 24 H 528 Z m 0,0"
					clip-rule="nonzero"
					id="path4612"
				/>
			</clipPath>
			<clipPath id="c053e953b7">
				<path d="m 540,483.99609 h 82 v 24 h -82 z m 0,0" clip-rule="nonzero" id="path4615" />
			</clipPath>
			<clipPath id="cdbbe4d932">
				<path d="m 519,500 h 77 v 7.99609 h -77 z m 0,0" clip-rule="nonzero" id="path4618" />
			</clipPath>
			<clipPath id="d577bb0800">
				<path
					d="M 395.26172,483.99609 H 428 V 493 h -32.73828 z m 0,0"
					clip-rule="nonzero"
					id="path4621"
				/>
			</clipPath>
			<clipPath id="1dc0c06ae7">
				<path d="m 687,483.99609 h 32 V 493 h -32 z m 0,0" clip-rule="nonzero" id="path4624" />
			</clipPath>
			<clipPath id="559917cdd0">
				<path d="M 400.67187,624 H 409 v 8 h -8.32813 z m 0,0" clip-rule="nonzero" id="path4627" />
			</clipPath>
			<clipPath id="829968d102">
				<path d="m 717,620 h 7.67187 v 9 H 717 Z m 0,0" clip-rule="nonzero" id="path4630" />
			</clipPath>
			<clipPath id="c75814b0b6">
				<path
					d="M 400.67187,617.78125 H 579 V 645 H 400.67187 Z m 0,0"
					clip-rule="nonzero"
					id="path4633"
				/>
			</clipPath>
			<clipPath id="d1610683e1">
				<path d="m 421,617.78125 h 200 v 32.25 H 421 Z m 0,0" clip-rule="nonzero" id="path4636" />
			</clipPath>
			<clipPath id="0046011bd7">
				<path
					d="M 532,617.78125 H 724.67187 V 647 H 532 Z m 0,0"
					clip-rule="nonzero"
					id="path4639"
				/>
			</clipPath>
			<clipPath id="4f04b9701d">
				<path d="M 587,617.78125 H 717 V 641 H 587 Z m 0,0" clip-rule="nonzero" id="path4642" />
			</clipPath>
			<clipPath id="18617e2d62">
				<path d="m 568,620 h 152 v 30.03125 H 568 Z m 0,0" clip-rule="nonzero" id="path4645" />
			</clipPath>
			<clipPath id="be1d3e8250">
				<path d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0" clip-rule="nonzero" id="path4648" />
			</clipPath>
			<clipPath id="42d7fac3ef">
				<path
					d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4651"
				/>
			</clipPath>
			<clipPath id="f0bbbbc5b0">
				<path
					d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4654"
				/>
			</clipPath>
			<clipPath id="03ff9b82e1">
				<path d="M 170,81 H 400.67187 V 195 H 170 Z m 0,0" clip-rule="nonzero" id="path4657" />
			</clipPath>
			<clipPath id="191bbfb93e">
				<path
					d="M 42.476562,396 H 363 v 50.86328 H 42.476562 Z m 0,0"
					clip-rule="nonzero"
					id="path4660"
				/>
			</clipPath>
			<clipPath id="aa6223acfd">
				<path
					d="m 347,388.36328 h 19.47656 V 408 H 347 Z m 0,0"
					clip-rule="nonzero"
					id="path4663"
				/>
			</clipPath>
			<clipPath id="65456aac5f-9">
				<path
					d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
					clip-rule="nonzero"
					id="path4588-6"
				/>
			</clipPath>
			<clipPath id="69488bb349-1">
				<path
					d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4591-0"
				/>
			</clipPath>
			<clipPath id="b46a85b818-4">
				<path
					d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4594-2"
				/>
			</clipPath>
			<clipPath id="931287b357-2">
				<path
					d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4597-2"
				/>
			</clipPath>
			<clipPath id="9f8d5c6b67-0">
				<path
					d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4600-5"
				/>
			</clipPath>
			<clipPath id="a131c9c548-5">
				<path
					d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4603-2"
				/>
			</clipPath>
			<clipPath id="65456aac5f-4">
				<path
					d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
					clip-rule="nonzero"
					id="path4588-9"
				/>
			</clipPath>
			<clipPath id="69488bb349-9">
				<path
					d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4591-3"
				/>
			</clipPath>
			<clipPath id="b46a85b818-6">
				<path
					d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4594-0"
				/>
			</clipPath>
			<clipPath id="931287b357-5">
				<path
					d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4597-0"
				/>
			</clipPath>
			<clipPath id="9f8d5c6b67-2">
				<path
					d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4600-9"
				/>
			</clipPath>
			<clipPath id="a131c9c548-4">
				<path
					d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4603-3"
				/>
			</clipPath>
			<clipPath id="65456aac5f-9-8">
				<path
					d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
					clip-rule="nonzero"
					id="path4588-6-9"
				/>
			</clipPath>
			<clipPath id="69488bb349-1-2">
				<path
					d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4591-0-8"
				/>
			</clipPath>
			<clipPath id="b46a85b818-4-8">
				<path
					d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
					clip-rule="nonzero"
					id="path4594-2-8"
				/>
			</clipPath>
			<clipPath id="931287b357-2-6">
				<path
					d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4597-2-8"
				/>
			</clipPath>
			<clipPath id="9f8d5c6b67-0-3">
				<path
					d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4600-5-8"
				/>
			</clipPath>
			<clipPath id="a131c9c548-5-3">
				<path
					d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
					clip-rule="nonzero"
					id="path4603-2-3"
				/>
			</clipPath>
			<clipPath id="c3dfdef643">
				<path d="m 204,250 h 55 v 160.39844 h -55 z m 0,0" clip-rule="nonzero" id="path5650" />
			</clipPath>
			<clipPath id="68084a2692">
				<path
					d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5653"
				/>
			</clipPath>
			<clipPath id="a9f825f88d">
				<path d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0" clip-rule="nonzero" id="path5656" />
			</clipPath>
			<clipPath id="e371159ec0">
				<path
					d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5659"
				/>
			</clipPath>
			<clipPath id="1aacbe7e75">
				<path d="m 212,216.14844 h 57 V 290 h -57 z m 0,0" clip-rule="nonzero" id="path5662" />
			</clipPath>
			<clipPath id="01b6702168">
				<path d="m 411,216.14844 h 91 V 247 h -91 z m 0,0" clip-rule="nonzero" id="path5665" />
			</clipPath>
			<clipPath id="1fe81e7f15">
				<path d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0" clip-rule="nonzero" id="path5668" />
			</clipPath>
			<clipPath id="ef8cb358c1">
				<path d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0" clip-rule="nonzero" id="path5671" />
			</clipPath>
			<clipPath id="28c256b738">
				<path d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0" clip-rule="nonzero" id="path5674" />
			</clipPath>
			<clipPath id="c0fb14b776">
				<path d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0" clip-rule="nonzero" id="path5677" />
			</clipPath>
			<clipPath id="8f1e156615">
				<path
					d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5680"
				/>
			</clipPath>
			<clipPath id="f1bcfcfd5a">
				<path
					d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5683"
				/>
			</clipPath>
			<clipPath id="beeac1b475">
				<path d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0" clip-rule="nonzero" id="path5686" />
			</clipPath>
			<clipPath id="5946722d62">
				<path d="m 230,216.14844 h 83 V 230 h -83 z m 0,0" clip-rule="nonzero" id="path5689" />
			</clipPath>
			<clipPath id="f773d7ee6f">
				<path d="m 221,406 h 92 v 4.39844 h -92 z m 0,0" clip-rule="nonzero" id="path5692" />
			</clipPath>
			<clipPath id="f78a6aa82b">
				<path d="m 195,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5695" />
			</clipPath>
			<clipPath id="23ff1b1a5d">
				<path d="m 402,216.14844 h 23 V 230 h -23 z m 0,0" clip-rule="nonzero" id="path5698" />
			</clipPath>
			<clipPath id="16634a2329">
				<path
					d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5701"
				/>
			</clipPath>
			<clipPath id="bc99b6b289">
				<path d="m 187,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5704" />
			</clipPath>
			<clipPath id="cf57b94926">
				<path d="m 376,406 h 57 v 4.39844 h -57 z m 0,0" clip-rule="nonzero" id="path5707" />
			</clipPath>
			<clipPath id="8d08386712">
				<path
					d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5710"
				/>
			</clipPath>
			<clipPath id="024131cb33">
				<path d="m 264,216.14844 h 40 V 221 h -40 z m 0,0" clip-rule="nonzero" id="path5713" />
			</clipPath>
			<clipPath id="183c0c3a7a">
				<path d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0" clip-rule="nonzero" id="path5716" />
			</clipPath>
			<clipPath id="fe92227834">
				<path d="m 187,216.14844 h 22 V 230 h -22 z m 0,0" clip-rule="nonzero" id="path5719" />
			</clipPath>
			<clipPath id="c3dfdef643-2">
				<path d="m 204,250 h 55 v 160.39844 h -55 z m 0,0" clip-rule="nonzero" id="path5650-6" />
			</clipPath>
			<clipPath id="68084a2692-5">
				<path
					d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5653-8"
				/>
			</clipPath>
			<clipPath id="a9f825f88d-7">
				<path d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0" clip-rule="nonzero" id="path5656-9" />
			</clipPath>
			<clipPath id="e371159ec0-6">
				<path
					d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5659-0"
				/>
			</clipPath>
			<clipPath id="1aacbe7e75-4">
				<path d="m 212,216.14844 h 57 V 290 h -57 z m 0,0" clip-rule="nonzero" id="path5662-1" />
			</clipPath>
			<clipPath id="01b6702168-0">
				<path d="m 411,216.14844 h 91 V 247 h -91 z m 0,0" clip-rule="nonzero" id="path5665-4" />
			</clipPath>
			<clipPath id="1fe81e7f15-8">
				<path d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0" clip-rule="nonzero" id="path5668-7" />
			</clipPath>
			<clipPath id="ef8cb358c1-0">
				<path
					d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5671-8"
				/>
			</clipPath>
			<clipPath id="28c256b738-6">
				<path d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0" clip-rule="nonzero" id="path5674-2" />
			</clipPath>
			<clipPath id="c0fb14b776-4">
				<path d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0" clip-rule="nonzero" id="path5677-7" />
			</clipPath>
			<clipPath id="8f1e156615-9">
				<path
					d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5680-3"
				/>
			</clipPath>
			<clipPath id="f1bcfcfd5a-9">
				<path
					d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5683-2"
				/>
			</clipPath>
			<clipPath id="beeac1b475-8">
				<path
					d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5686-3"
				/>
			</clipPath>
			<clipPath id="5946722d62-0">
				<path d="m 230,216.14844 h 83 V 230 h -83 z m 0,0" clip-rule="nonzero" id="path5689-1" />
			</clipPath>
			<clipPath id="f773d7ee6f-7">
				<path d="m 221,406 h 92 v 4.39844 h -92 z m 0,0" clip-rule="nonzero" id="path5692-8" />
			</clipPath>
			<clipPath id="f78a6aa82b-9">
				<path d="m 195,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5695-1" />
			</clipPath>
			<clipPath id="23ff1b1a5d-5">
				<path d="m 402,216.14844 h 23 V 230 h -23 z m 0,0" clip-rule="nonzero" id="path5698-4" />
			</clipPath>
			<clipPath id="16634a2329-9">
				<path
					d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5701-2"
				/>
			</clipPath>
			<clipPath id="bc99b6b289-5">
				<path d="m 187,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5704-7" />
			</clipPath>
			<clipPath id="cf57b94926-4">
				<path d="m 376,406 h 57 v 4.39844 h -57 z m 0,0" clip-rule="nonzero" id="path5707-9" />
			</clipPath>
			<clipPath id="8d08386712-9">
				<path
					d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5710-4"
				/>
			</clipPath>
			<clipPath id="024131cb33-5">
				<path d="m 264,216.14844 h 40 V 221 h -40 z m 0,0" clip-rule="nonzero" id="path5713-9" />
			</clipPath>
			<clipPath id="183c0c3a7a-3">
				<path
					d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5716-5"
				/>
			</clipPath>
			<clipPath id="fe92227834-7">
				<path d="m 187,216.14844 h 22 V 230 h -22 z m 0,0" clip-rule="nonzero" id="path5719-0" />
			</clipPath>
			<clipPath id="c3dfdef643-4">
				<path d="m 204,250 h 55 v 160.39844 h -55 z m 0,0" clip-rule="nonzero" id="path5650-3" />
			</clipPath>
			<clipPath id="68084a2692-7">
				<path
					d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5653-1"
				/>
			</clipPath>
			<clipPath id="a9f825f88d-3">
				<path d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0" clip-rule="nonzero" id="path5656-8" />
			</clipPath>
			<clipPath id="e371159ec0-0">
				<path
					d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5659-9"
				/>
			</clipPath>
			<clipPath id="1aacbe7e75-7">
				<path d="m 212,216.14844 h 57 V 290 h -57 z m 0,0" clip-rule="nonzero" id="path5662-9" />
			</clipPath>
			<clipPath id="01b6702168-9">
				<path d="m 411,216.14844 h 91 V 247 h -91 z m 0,0" clip-rule="nonzero" id="path5665-3" />
			</clipPath>
			<clipPath id="1fe81e7f15-2">
				<path d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0" clip-rule="nonzero" id="path5668-4" />
			</clipPath>
			<clipPath id="ef8cb358c1-3">
				<path
					d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5671-7"
				/>
			</clipPath>
			<clipPath id="28c256b738-1">
				<path d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0" clip-rule="nonzero" id="path5674-22" />
			</clipPath>
			<clipPath id="c0fb14b776-0">
				<path d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0" clip-rule="nonzero" id="path5677-2" />
			</clipPath>
			<clipPath id="8f1e156615-1">
				<path
					d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5680-7"
				/>
			</clipPath>
			<clipPath id="f1bcfcfd5a-5">
				<path
					d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5683-1"
				/>
			</clipPath>
			<clipPath id="beeac1b475-7">
				<path
					d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5686-4"
				/>
			</clipPath>
			<clipPath id="5946722d62-1">
				<path d="m 230,216.14844 h 83 V 230 h -83 z m 0,0" clip-rule="nonzero" id="path5689-7" />
			</clipPath>
			<clipPath id="f773d7ee6f-1">
				<path d="m 221,406 h 92 v 4.39844 h -92 z m 0,0" clip-rule="nonzero" id="path5692-1" />
			</clipPath>
			<clipPath id="f78a6aa82b-1">
				<path d="m 195,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5695-7" />
			</clipPath>
			<clipPath id="23ff1b1a5d-0">
				<path d="m 402,216.14844 h 23 V 230 h -23 z m 0,0" clip-rule="nonzero" id="path5698-40" />
			</clipPath>
			<clipPath id="16634a2329-8">
				<path
					d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5701-5"
				/>
			</clipPath>
			<clipPath id="bc99b6b289-1">
				<path d="m 187,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5704-6" />
			</clipPath>
			<clipPath id="cf57b94926-6">
				<path d="m 376,406 h 57 v 4.39844 h -57 z m 0,0" clip-rule="nonzero" id="path5707-2" />
			</clipPath>
			<clipPath id="8d08386712-1">
				<path
					d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5710-9"
				/>
			</clipPath>
			<clipPath id="024131cb33-6">
				<path d="m 264,216.14844 h 40 V 221 h -40 z m 0,0" clip-rule="nonzero" id="path5713-4" />
			</clipPath>
			<clipPath id="183c0c3a7a-8">
				<path
					d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5716-0"
				/>
			</clipPath>
			<clipPath id="fe92227834-8">
				<path d="m 187,216.14844 h 22 V 230 h -22 z m 0,0" clip-rule="nonzero" id="path5719-1" />
			</clipPath>
			<clipPath id="c3dfdef643-28">
				<path d="m 204,250 h 55 v 160.39844 h -55 z m 0,0" clip-rule="nonzero" id="path5650-0" />
			</clipPath>
			<clipPath id="68084a2692-3">
				<path
					d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5653-7"
				/>
			</clipPath>
			<clipPath id="a9f825f88d-0">
				<path d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0" clip-rule="nonzero" id="path5656-0" />
			</clipPath>
			<clipPath id="e371159ec0-3">
				<path
					d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5659-4"
				/>
			</clipPath>
			<clipPath id="1aacbe7e75-9">
				<path d="m 212,216.14844 h 57 V 290 h -57 z m 0,0" clip-rule="nonzero" id="path5662-2" />
			</clipPath>
			<clipPath id="01b6702168-7">
				<path d="m 411,216.14844 h 91 V 247 h -91 z m 0,0" clip-rule="nonzero" id="path5665-42" />
			</clipPath>
			<clipPath id="1fe81e7f15-5">
				<path d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0" clip-rule="nonzero" id="path5668-2" />
			</clipPath>
			<clipPath id="ef8cb358c1-4">
				<path
					d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5671-4"
				/>
			</clipPath>
			<clipPath id="28c256b738-3">
				<path d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0" clip-rule="nonzero" id="path5674-8" />
			</clipPath>
			<clipPath id="c0fb14b776-6">
				<path d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0" clip-rule="nonzero" id="path5677-0" />
			</clipPath>
			<clipPath id="8f1e156615-8">
				<path
					d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5680-9"
				/>
			</clipPath>
			<clipPath id="f1bcfcfd5a-2">
				<path
					d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5683-23"
				/>
			</clipPath>
			<clipPath id="beeac1b475-1">
				<path
					d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5686-8"
				/>
			</clipPath>
			<clipPath id="5946722d62-3">
				<path d="m 230,216.14844 h 83 V 230 h -83 z m 0,0" clip-rule="nonzero" id="path5689-4" />
			</clipPath>
			<clipPath id="f773d7ee6f-2">
				<path d="m 221,406 h 92 v 4.39844 h -92 z m 0,0" clip-rule="nonzero" id="path5692-2" />
			</clipPath>
			<clipPath id="f78a6aa82b-4">
				<path d="m 195,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5695-5" />
			</clipPath>
			<clipPath id="23ff1b1a5d-1">
				<path d="m 402,216.14844 h 23 V 230 h -23 z m 0,0" clip-rule="nonzero" id="path5698-7" />
			</clipPath>
			<clipPath id="16634a2329-5">
				<path
					d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5701-7"
				/>
			</clipPath>
			<clipPath id="bc99b6b289-16">
				<path d="m 187,388 h 5 v 22.39844 h -5 z m 0,0" clip-rule="nonzero" id="path5704-9" />
			</clipPath>
			<clipPath id="cf57b94926-8">
				<path d="m 376,406 h 57 v 4.39844 h -57 z m 0,0" clip-rule="nonzero" id="path5707-1" />
			</clipPath>
			<clipPath id="8d08386712-3">
				<path
					d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5710-3"
				/>
			</clipPath>
			<clipPath id="024131cb33-3">
				<path d="m 264,216.14844 h 40 V 221 h -40 z m 0,0" clip-rule="nonzero" id="path5713-7" />
			</clipPath>
			<clipPath id="183c0c3a7a-9">
				<path
					d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
					clip-rule="nonzero"
					id="path5716-8"
				/>
			</clipPath>
			<clipPath id="fe92227834-6">
				<path d="m 187,216.14844 h 22 V 230 h -22 z m 0,0" clip-rule="nonzero" id="path5719-7" />
			</clipPath>
			<clipPath id="be1d3e8250-8">
				<path d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0" clip-rule="nonzero" id="path4648-0" />
			</clipPath>
			<clipPath id="be1d3e8250-0">
				<path d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0" clip-rule="nonzero" id="path4648-6" />
			</clipPath>
			<clipPath id="03ff9b82e1-9">
				<path d="M 170,81 H 400.67187 V 195 H 170 Z m 0,0" clip-rule="nonzero" id="path4657-2" />
			</clipPath>
			<clipPath id="42d7fac3ef-8">
				<path
					d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4651-4"
				/>
			</clipPath>
			<clipPath id="f0bbbbc5b0-5">
				<path
					d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4654-6"
				/>
			</clipPath>
			<clipPath id="42d7fac3ef-83">
				<path
					d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4651-8"
				/>
			</clipPath>
			<clipPath id="f0bbbbc5b0-7">
				<path
					d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4654-5"
				/>
			</clipPath>
			<clipPath id="42d7fac3ef-83-7">
				<path
					d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4651-8-3"
				/>
			</clipPath>
			<clipPath id="f0bbbbc5b0-7-2">
				<path
					d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4654-5-7"
				/>
			</clipPath>
			<clipPath id="42d7fac3ef-83-7-1">
				<path
					d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4651-8-3-6"
				/>
			</clipPath>
			<clipPath id="f0bbbbc5b0-7-2-2">
				<path
					d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
					clip-rule="nonzero"
					id="path4654-5-7-0"
				/>
			</clipPath>
			<clipPath id="2829f2d612">
				<path
					d="m 429,53.101562 h 12.60156 V 66 H 429 Z m 0,0"
					clip-rule="nonzero"
					id="path131488"
				/>
			</clipPath>
			<clipPath id="c632f4d2a7">
				<path
					d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
					clip-rule="nonzero"
					id="path131491"
				/>
			</clipPath>
			<clipPath id="9989cfe438">
				<path d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0" clip-rule="nonzero" id="path131494" />
			</clipPath>
			<clipPath id="c632f4d2a7-3">
				<path
					d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
					clip-rule="nonzero"
					id="path131491-5"
				/>
			</clipPath>
			<clipPath id="2829f2d612-1">
				<path
					d="m 429,53.101562 h 12.60156 V 66 H 429 Z m 0,0"
					clip-rule="nonzero"
					id="path161552"
				/>
			</clipPath>
			<clipPath id="c632f4d2a7-2">
				<path
					d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
					clip-rule="nonzero"
					id="path161555"
				/>
			</clipPath>
			<clipPath id="9989cfe438-7">
				<path d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0" clip-rule="nonzero" id="path161558" />
			</clipPath>
			<clipPath id="9989cfe438-7-7">
				<path d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0" clip-rule="nonzero" id="path161558-9" />
			</clipPath>
		</defs>
		<g
			inkscape:groupmode="layer"
			id="layer1"
			inkscape:label="base"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		>
			<path
				id="rect4155"
				style="fill:#ffffff;stroke:none;stroke-width:1.91063;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000"
				d="m 193.56836,256.92969 0.0293,0.0293 -47.31446,47.31446 v 228.40234 l 47.31446,47.31445 -0.0293,0.0293 H 847.0625 l 47.30859,-47.30859 0.002,0.002 V 304.23633 l -0.002,0.002 -47.30664,-47.30859 z"
				transform="scale(0.75)"
			/>
		</g>
		<g
			inkscape:groupmode="layer"
			id="layer3"
			inkscape:label="background"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		>
			<g id="g208937" style="fill:#e5ddff;fill-opacity:1">
				<g
					clip-path="url(#c3dfdef643)"
					id="g5726"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 206.46484,410.47266 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 6.91016 l 43.33984,-43.39454 0.20703,-0.21093 v -61.05078 l -50.53515,-50.60547 c 0.13281,-0.28125 0.22265,-0.58594 0.22265,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 50.11328,50.17969 v 59.85937 l -42.70312,42.76172 h -6.31641 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204089"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 391.37524,307.01581 v -47.38974 l -7.84419,-5.6476 h -44.87036 l -21.01604,-15.13335 c 0.11516,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 0.28789,0 0.55207,-0.056 0.79593,-0.13881 l 21.19895,15.26242 0.18288,0.13151 h 44.87036 l 7.11261,5.12157 v 47.01956 c -0.72142,0.18753 -1.2464,0.67217 -1.2464,1.25665 0,0.74279 0.83657,1.34433 1.8696,1.34433 1.03302,0 1.86959,-0.60154 1.86959,-1.34433 0,-0.58448 -0.52158,-1.07156 -1.24639,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204083"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#a9f825f88d)"
					id="g5736"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 501.875,408.31641 c 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.00781,1.4375 h -40.82032 l -58.73828,-58.81641 c 0.13282,-0.28125 0.22266,-0.58593 0.22266,-0.91797 0,-1.19531 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96484,2.15625 2.15625,2.15625 0.33203,0 0.63672,-0.0859 0.91797,-0.21875 l 58.94922,59.02735 0.21093,0.21094 h 41.41016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204080"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 293.79033,227.05553 h -67.30891 l -13.53427,-9.74877 c 0.11516,-0.17534 0.18967,-0.3653 0.18967,-0.57231 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -1.02963,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83997,1.34675 1.8696,1.34675 0.28789,0 0.55207,-0.056 0.79594,-0.13881 l 13.72054,9.87784 0.1829,0.13151 h 67.30892 l 58.40801,42.05629 c -0.11516,0.17535 -0.19306,0.3653 -0.19306,0.57231 0,0.74279 0.83658,1.34432 1.8696,1.34432 1.03303,0 1.8696,-0.60153 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -58.59091,-42.18537 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204077"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 278.83355,303.33598 h 20.43349 c 0.25741,0.52117 0.93141,0.89622 1.74428,0.89622 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48687,0.37748 -1.74428,0.89865 h -20.94831 l -14.95678,10.76674 h -29.40214 l -7.47839,-5.38459 h -65.81867 c -0.2574,-0.51873 -0.93141,-0.89621 -1.74428,-0.89621 -1.03301,0 -1.8696,0.60153 -1.8696,1.34675 0,0.74279 0.83659,1.34433 1.8696,1.34433 0.81287,0 1.48688,-0.37749 1.74428,-0.89622 h 65.30385 l 7.47839,5.38459 h 30.43177 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204074"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 392.62163,243.65739 c 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25422 v 8.25831 c -0.72142,0.18753 -1.2464,0.67217 -1.2464,1.25665 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.58448 -0.52158,-1.06912 -1.24639,-1.25665 v -8.25831 c 0.72481,-0.18509 1.24639,-0.66973 1.24639,-1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204071"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#e371159ec0)"
					id="g5746"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,375.92578 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 32.78516 l 26.08984,-26.12109 0.20703,-0.21094 v -17.87109 l -7.40625,-7.41797 c 0.13282,-0.28125 0.21875,-0.58594 0.21875,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 6.98828,6.99609 v 16.67969 l -25.45312,25.48437 h -32.19141 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204068"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 173.61785,297.05274 -6.42505,4.62719 c -0.24386,-0.0852 -0.50805,-0.13881 -0.79594,-0.13881 -1.03301,0 -1.86959,0.60154 -1.86959,1.34676 0,0.74278 0.83658,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0745,-0.39697 -0.18967,-0.57232 l 6.05588,-4.36417 h 6.96357 l 6.05926,4.36417 c -0.11515,0.17535 -0.19306,0.36531 -0.19306,0.57232 0,0.74278 0.83659,1.34432 1.8696,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.0536 -0.79593,0.13881 l -6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204062"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#01b6702168)"
					id="g5756"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 499.71875,216.14844 c -0.93359,0 -1.71094,0.60547 -2.01172,1.4414 h -58.66016 l -24.66406,24.69141 c -0.27734,-0.13281 -0.58203,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96875 -2.15625,2.16016 0,1.19141 0.96484,2.16016 2.15625,2.16016 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.33203 -0.0898,-0.63672 -0.22266,-0.91797 l 24.23828,-24.27344 h 58.07032 c 0.29687,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204059"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 164.52727,259.81116 c 0,0.74279 0.83658,1.34676 1.86959,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58448 -0.52159,-1.06912 -1.2464,-1.25665 v -9.69761 l -7.84418,-5.64761 h -7.99321 l -6.42505,4.62475 c -0.24386,-0.0828 -0.50804,-0.13881 -0.79593,-0.13881 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.207 -0.0745,-0.39696 -0.19305,-0.57231 l 6.05926,-4.36417 h 6.96358 l 7.11259,5.12158 v 9.32743 c -0.72142,0.18753 -1.24639,0.67217 -1.24639,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204056"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#1fe81e7f15)"
					id="g5762"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 361.71875,324.10937 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.33203,0 -0.63672,0.0899 -0.91797,0.22266 l -41.69922,-41.75781 -0.21484,-0.20704 h -51.75 l -42.70313,-42.76171 v -8.04297 l 8.20313,-8.21485 h 6.3164 c 0.30079,0.83594 1.07813,1.44141 2.01172,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.01172,1.4414 h -6.91015 l -9.04688,9.0586 v 9.23047 l 43.33594,43.39453 0.21094,0.21093 h 51.75 l 41.48828,41.54688 c -0.13281,0.28125 -0.21875,0.58594 -0.21875,0.91797 0,1.1914 0.96484,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204053"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#ef8cb358c1)"
					id="g5766"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,324.10937 c 0.9375,0 1.71094,-0.60546 2.01172,-1.4414 h 21.85156 c 0.30079,0.83594 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -21.85156 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204050"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#28c256b738)"
					id="g5770"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 439.04687,409.03516 h 6.91016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.01172,1.4375 h -6.31641 l -77.41406,-77.51953 -0.21094,-0.21094 h -9.21875 l -41.91406,41.96875 c -0.28125,-0.13672 -0.58594,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96484,2.15625 2.15625,2.15625 1.1875,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22266,-0.92187 l 41.48828,-41.54297 h 8.03125 l 77.41407,77.51953 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204047"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#c0fb14b776)"
					id="g5774"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 413.46875,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.9375,0 -1.71484,0.60547 -2.01172,1.4414 h -93.16406 l -34.4961,34.54688 h -32.19531 c -0.29687,-0.83594 -1.07422,-1.44141 -2.01172,-1.44141 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.9375,0 1.71485,-0.60546 2.01172,-1.4414 h 32.78906 l 34.4961,-34.54688 h 92.57031 c 0.29688,0.83594 1.07422,1.44141 2.01172,1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204044"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 338.66069,248.59388 -67.12264,-48.32979 -0.18289,-0.13151 h -13.46991 c -0.2608,-0.52117 -0.9348,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37748 1.74428,-0.89865 h 12.95509 l 67.12265,48.32979 0.18288,0.13151 h 7.99321 l 7.84419,-5.6476 v -10.76918 l 28.49444,-20.51551 c 0.24386,0.0828 0.50804,0.13882 0.79593,0.13882 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.20701 0.0779,0.39697 0.19306,0.57231 l -28.67734,20.64702 -0.1829,0.13394 v 10.76918 l -7.1126,5.12157 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204041"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,220.77228 c -0.81287,0 -1.48687,0.37749 -1.74428,0.89866 h -65.30723 l -7.11261,-5.12158 v -5.01441 l 13.54104,-9.74633 c 0.24386,0.0828 0.50805,0.13882 0.79594,0.13882 1.02963,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83997,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.20701 0.0745,0.39697 0.18967,0.57231 l -13.72055,9.87784 -0.1829,0.13394 v 5.75477 l 7.84419,5.64761 h 65.82205 c 0.25741,0.52116 0.93141,0.89864 1.74428,0.89864 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204038"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#8f1e156615)"
					id="g5784"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,315.47266 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.9375 -0.60547,-1.71484 -1.4375,-2.01563 v -6.32421 l 24.23828,-24.26954 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33204 0.0898,0.63672 0.22266,0.91797 l -24.45313,24.48438 -0.20703,0.21094 v 6.91796 c -0.83203,0.30079 -1.4375,1.07813 -1.4375,2.01563 0,1.19141 0.96485,2.16016 2.15625,2.16016 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path204032"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 269.22815,216.73445 c 0,0.74278 0.83658,1.34675 1.8696,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.58448 -0.52498,-1.06913 -1.2464,-1.25665 v -8.25588 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58449 0.52159,1.06913 1.2464,1.25665 v 8.25832 c -0.72481,0.18508 -1.2464,0.66973 -1.2464,1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204029"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 301.26873,205.51717 h -5.99152 c -0.26079,-0.52117 -0.9348,-0.89866 -1.74428,-0.89866 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 5.4767 l 44.50457,32.04452 v 3.94285 c -0.72142,0.18752 -1.2464,0.67216 -1.2464,1.25664 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58448 -0.52498,-1.06912 -1.2464,-1.25664 v -4.31303 l -45.05325,-32.44148 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204026"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 337.96299,291.79966 -0.1829,0.13151 v 5.7572 l 15.13968,10.90069 0.18289,0.13151 h 28.4267 c 0.2608,0.51873 0.93481,0.89622 1.74428,0.89622 1.03303,0 1.8696,-0.60154 1.8696,-1.34433 0,-0.74522 -0.83657,-1.34675 -1.8696,-1.34675 -0.80947,0 -1.48348,0.37748 -1.74428,0.89621 h -27.91188 l -14.59099,-10.50616 v -5.01197 l 37.21245,-26.79144 0.17951,-0.13151 v -4.31546 c 0.72481,-0.18509 1.2464,-0.66973 1.2464,-1.25422 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25422 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204023"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 256.76417,259.62607 -22.61808,-16.28527 -0.18628,-0.13151 h -37.90678 l -7.84419,5.64761 v 27.29312 l 21.38184,15.39636 c -0.11515,0.17292 -0.19306,0.36531 -0.19306,0.57232 0,0.74278 0.83997,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -0.2845,0 -0.54868,0.0536 -0.79254,0.13882 l -21.01944,-15.13092 v -26.55276 l 7.11261,-5.12158 h 36.87714 l 22.07278,15.89075 v 5.01198 l -6.05926,4.36417 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.03302,0 -1.86959,0.60154 -1.86959,1.34676 0,0.74279 0.83657,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60153 1.8696,-1.34432 0,-0.20701 -0.0779,-0.39696 -0.19306,-0.57231 l 6.42506,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204020"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 241.18418,218.0812 c 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -6.42844,-4.62475 h -5.99152 c -0.25741,-0.52117 -0.93142,-0.89866 -1.74089,-0.89866 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.80947,0 1.48348,-0.37748 1.74089,-0.89865 h 5.4767 l 6.05926,4.36417 c -0.11515,0.17535 -0.18967,0.36531 -0.18967,0.57231 0,0.74278 0.83658,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204017"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,236.92605 c -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.207 0.0779,0.39696 0.19306,0.57231 l -6.42506,4.62719 v 4.31303 c -0.72142,0.18752 -1.24639,0.67216 -1.24639,1.25664 0,0.74279 0.83657,1.34676 1.86959,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58448 -0.52159,-1.06912 -1.2464,-1.25664 v -3.94285 l 6.05926,-4.36174 c 0.24386,0.0828 0.50805,0.13881 0.79594,0.13881 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204014"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,231.54146 c -0.81287,0 -1.48687,0.37749 -1.74428,0.89865 h -48.86358 c -0.2574,-0.52116 -0.93141,-0.89865 -1.74089,-0.89865 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83658,1.34675 1.8696,1.34675 0.80948,0 1.48349,-0.37748 1.74428,-0.89865 h 48.86019 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204011"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 353.36007,277.30925 c 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -43.63412,-31.41619 -0.1829,-0.13151 h -20.9483 c -0.26079,-0.52117 -0.93141,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.80948,0 1.48349,-0.37748 1.74428,-0.89865 h 20.43348 l 43.45123,31.28712 c -0.11516,0.17535 -0.19306,0.3653 -0.19306,0.57231 0,0.74278 0.83658,1.34432 1.8696,1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204008"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 211.89381,271.83455 c 0.72142,-0.18508 1.24301,-0.66972 1.24301,-1.25421 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -1.02963,0 -1.8696,0.60154 -1.8696,1.34676 0,0.58449 0.52498,1.06913 1.24979,1.25421 v 15.08465 l 30.09647,21.66986 0.18289,0.13151 h 22.94999 l 15.13969,-10.90069 0.18289,-0.13151 v -21.90853 l -7.84418,-5.6476 h -7.99321 l -6.42505,4.62475 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03303,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.86959,-0.60154 1.86959,-1.34432 0,-0.20701 -0.0779,-0.39696 -0.19305,-0.57231 l 6.05925,-4.36417 h 6.96358 l 7.11261,5.12157 v 21.16574 l -14.591,10.50616 h -21.92036 l -29.54778,-21.27534 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204005"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,199.23393 c -0.80948,0 -1.48349,0.37748 -1.7409,0.89865 h -50.86527 l -13.90343,10.00934 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.207 -0.0779,-0.39696 -0.19306,-0.57231 l 13.53765,-9.74876 h 50.34706 c 0.2608,0.52117 0.93481,0.89865 1.74429,0.89865 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path204002"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 239.31458,302.88788 c 0,0.74278 0.83658,1.34432 1.8696,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25666 v -13.6429 c 0.72142,-0.18509 1.2464,-0.66973 1.2464,-1.25421 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.58448 0.52159,1.06912 1.2464,1.25421 v 13.6429 c -0.72481,0.1851 -1.2464,0.67217 -1.2464,1.25666 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203999"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,204.61851 c -0.80948,0 -1.48349,0.37749 -1.7409,0.89866 h -20.95169 l -7.84418,5.6476 v 9.69762 c -0.72142,0.18752 -1.2464,0.67216 -1.2464,1.25665 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.58449 -0.52159,-1.06913 -1.2464,-1.25665 v -9.32744 l 7.1126,-5.12157 h 20.43349 c 0.2608,0.52117 0.93481,0.89865 1.74429,0.89865 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203996"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,210.0031 c -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58449 0.52498,1.06913 1.2464,1.25665 v 20.09662 l -7.11261,5.11914 h -5.4767 c -0.25741,-0.51873 -0.93141,-0.89622 -1.74428,-0.89622 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83658,1.34675 1.8696,1.34675 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 5.99152 l 7.84419,-5.6476 v -20.4668 c 0.72481,-0.18752 1.24639,-0.67216 1.24639,-1.25665 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203993"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f1bcfcfd5a)"
					id="g5814"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,367.28906 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22265,-0.92187 l 50.32812,-50.39063 0.20703,-0.21094 v -6.92187 c 0.83594,-0.29688 1.4375,-1.07422 1.4375,-2.01172 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 6.32812 l -50.11328,50.17969 c -0.28125,-0.13672 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203990"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#beeac1b475)"
					id="g5818"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,384.5625 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 13.22656 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -13.22656 c -0.30078,-0.83203 -1.07812,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203987"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 256.93351,215.52651 c -0.24047,-0.0828 -0.50465,-0.13882 -0.79254,-0.13882 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.207 -0.0779,-0.39696 -0.19305,-0.57231 l 6.42505,-4.62719 v -4.31303 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58449 0.52159,1.06913 1.2464,1.25665 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203984"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#5946722d62)"
					id="g5824"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 232.33984,224.78516 c -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 h 67.28906 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.1875,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96875,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0859,0.63672 0.21875,0.91797 l -6.98828,7 h -66.69141 c -0.29687,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203981"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#f773d7ee6f)"
					id="g5828"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 312.125,408.31641 c 0,-1.19532 -0.96875,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71484,0.60547 -2.01172,1.4375 h -82.23047 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 82.23047 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.1875,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203978"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 336.53369,275.96493 c 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25665 v -4.31303 l -30.09647,-21.66986 -0.1829,-0.13151 h -44.87036 l -13.53765,-9.74876 c 0.11517,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83657,1.34675 1.86959,1.34675 0.28789,0 0.55208,-0.056 0.79594,-0.13881 l 13.71716,9.87783 0.18628,0.13151 h 44.87035 l 29.54779,21.27534 v 3.94285 c -0.72142,0.18752 -1.2464,0.67216 -1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203975"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 158.91847,269.23358 c -0.81287,0 -1.48348,0.37749 -1.74428,0.89866 h -11.46822 c -0.25741,-0.52117 -0.93142,-0.89866 -1.74428,-0.89866 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74279 0.83658,1.34432 1.8696,1.34432 0.81286,0 1.48348,-0.37505 1.74428,-0.89621 h 11.46822 c 0.2608,0.52116 0.9348,0.89621 1.74428,0.89621 1.03302,0 1.8696,-0.60153 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203972"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 301.01132,236.92605 c -0.81287,0 -1.48687,0.37749 -1.74428,0.89622 h -20.94831 l -7.47839,5.38702 h -6.96358 l -6.05925,-4.36417 c 0.11516,-0.17535 0.19305,-0.36531 0.19305,-0.57231 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 0.28789,0 0.55207,-0.056 0.79254,-0.13881 l 6.42844,4.62475 h 7.99321 l 7.47839,-5.38459 h 20.43349 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203969"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 255.51777,286.54658 v 15.08464 c -0.72481,0.1851 -1.2464,0.67217 -1.2464,1.25666 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.86959,-0.60154 1.86959,-1.34432 0,-0.58449 -0.52497,-1.07156 -1.24639,-1.25666 V 286.9192 l 13.53765,-9.74633 c 0.24386,0.0828 0.50804,0.13638 0.79593,0.13638 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.20701 0.0745,0.39696 0.18967,0.57231 l -13.72055,9.87783 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203966"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,274.61817 c -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -13.53766,-9.74876 v -3.94285 c 0.72142,-0.18509 1.2464,-0.66973 1.2464,-1.25422 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.86959,0.60397 -1.86959,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25422 v 4.31546 l 13.90344,10.01178 c -0.11854,0.17535 -0.19306,0.3653 -0.19306,0.57231 0,0.74278 0.83658,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203963"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 331.54809,270.39525 -22.61807,-16.28771 -0.1829,-0.12907 h -35.90509 c -0.26079,-0.52117 -0.9348,-0.89865 -1.74428,-0.89865 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.80948,0 1.48349,-0.37748 1.74428,-0.89865 h 35.39027 l 22.06939,15.89075 v 5.01441 l -6.05925,4.36174 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83658,1.34432 1.8696,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0745,-0.39697 -0.19306,-0.57231 l 6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203960"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 345.88168,258.46441 c -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 6.42505,4.62476 h 5.99152 c 0.2608,0.52116 0.93481,0.89865 1.74429,0.89865 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74522 -0.83657,-1.34675 -1.86959,-1.34675 -0.80948,0 -1.48349,0.37748 -1.74429,0.89621 h -5.4767 l -6.05926,-4.36173 c 0.11854,-0.17535 0.19306,-0.36531 0.19306,-0.57232 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203957"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 142.09209,259.81116 c 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.58448 -0.52498,-1.06912 -1.2464,-1.25665 v -4.31303 l -13.90343,-10.01177 c 0.11515,-0.17535 0.19305,-0.36531 0.19305,-0.57232 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13881 l 13.53766,9.74632 v 3.94285 c -0.72142,0.18753 -1.2464,0.67217 -1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203954"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f78a6aa82b)"
					id="g5848"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 195.68359,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71875 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203951"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 369.11279,274.75699 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03303,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0745,-0.39696 -0.18967,-0.57231 l 13.72055,-9.88027 0.1795,-0.13151 v -4.31546 c 0.72481,-0.18509 1.2464,-0.66973 1.2464,-1.25422 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.86959,0.60397 -1.86959,1.34675 0,0.58449 0.52497,1.06913 1.24639,1.25422 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203948"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 315.96811,207.31203 c 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48349,0.37749 -1.74428,0.89866 h -5.47671 l -7.47839,-5.38459 h -20.9483 c -0.2608,-0.52117 -0.93481,-0.89865 -1.74429,-0.89865 -1.03302,0 -1.86959,0.60397 -1.86959,1.34675 0,0.74279 0.83657,1.34676 1.86959,1.34676 0.80948,0 1.48349,-0.37748 1.74429,-0.89865 h 20.43348 l 7.47839,5.38459 h 5.99153 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203945"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 188.20884,293.37291 v 4.31546 l 6.42506,4.62719 c -0.11516,0.17535 -0.19306,0.36531 -0.19306,0.57232 0,0.74278 0.83996,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.0561 -0.79593,0.13881 l -6.05926,-4.36417 v -3.94285 c 0.72481,-0.18509 1.2464,-0.66973 1.2464,-1.25421 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -1.03301,0 -1.8696,0.60154 -1.8696,1.34676 0,0.58448 0.52498,1.06912 1.2464,1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203942"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 324.0697,270.39525 -13.90345,-10.01177 c 0.11517,-0.17535 0.19306,-0.36531 0.19306,-0.57232 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 13.53765,9.74633 v 5.01441 l -6.05926,4.36174 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03303,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57231 l 6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203939"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 338.40329,210.0031 c -0.80948,0 -1.48349,0.37749 -1.74428,0.89866 h -5.99153 l -6.42504,4.62475 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83658,1.34675 1.8696,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.207 -0.0745,-0.39696 -0.19306,-0.57231 l 6.05926,-4.36417 h 5.47671 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203936"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 249.10288,265.51235 0.18289,-0.13151 v -5.75477 l -6.42505,-4.62718 c 0.11516,-0.17535 0.19306,-0.36531 0.19306,-0.57232 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55208,-0.056 0.79255,-0.13882 l 6.06264,4.36174 v 5.01198 l -14.77727,10.63767 -0.1829,0.13394 v 4.31303 c -0.72142,0.18752 -1.24301,0.67216 -1.24301,1.25665 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.02963,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.58449 -0.52498,-1.07156 -1.24979,-1.25665 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203933"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 314.09851,270.58034 c 0,0.74279 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60153 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55208,0.056 -0.79594,0.13882 l -13.72054,-9.88027 -0.1829,-0.13151 h -13.46991 c -0.26079,-0.51873 -0.9348,-0.89621 -1.74428,-0.89621 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.80948,0 1.48349,-0.37748 1.74428,-0.89865 h 12.95509 l 13.53766,9.74876 c -0.11854,0.17535 -0.19306,0.3653 -0.19306,0.57231 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203930"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#23ff1b1a5d)"
					id="g5866"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 422.09375,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0898,0.63672 0.22266,0.91797 l -6.98829,7 h -6.3164 c -0.29688,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96484,2.16016 2.15625,2.16016 0.9375,0 1.71484,-0.60547 2.01172,-1.44141 h 6.91015 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203927"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#16634a2329)"
					id="g5870"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,350.01562 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.63671 -0.22265,-0.91796 l 15.61328,-15.63672 h 6.3164 c 0.29688,0.83593 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -6.91015 l -16.03516,16.05859 c -0.28125,-0.13281 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203924"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 271.72095,287.98832 c 0.72142,-0.18509 1.2464,-0.66973 1.2464,-1.25421 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.58448 0.52159,1.06912 1.2464,1.25421 v 9.32744 l -6.06265,4.36417 c -0.24047,-0.0852 -0.50465,-0.13881 -0.79254,-0.13881 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83658,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0779,-0.39941 -0.19306,-0.57232 l 6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203921"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#bc99b6b289)"
					id="g5876"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 187.05859,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71485 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203918"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 355.10435,248.59388 c -0.25741,-0.52117 -0.93141,-0.89865 -1.74428,-0.89865 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 5.99152 l 6.42844,-4.62475 c 0.24047,0.0828 0.50466,0.13881 0.79255,0.13881 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.20701 0.0779,0.39697 0.19306,0.57232 l -6.05927,4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203915"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 368.31686,285.38735 c -0.80948,0 -1.48349,0.37748 -1.74428,0.89622 h -13.46992 l -7.84418,5.6476 v 5.7572 l 7.84418,5.64761 h 28.4267 c 0.2608,0.52117 0.93481,0.89622 1.74428,0.89622 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -0.80947,0 -1.48348,0.37748 -1.74428,0.89865 h -27.91188 l -7.1126,-5.12401 v -5.01197 l 7.1126,-5.12158 h 12.9551 c 0.26079,0.52117 0.9348,0.89622 1.74428,0.89622 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203912"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 385.14324,270.58034 c 0,-0.74522 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.86959,0.60154 -1.86959,1.34676 0,0.58449 0.52497,1.06913 1.24639,1.25421 v 13.64291 c -0.72142,0.18752 -1.24639,0.67216 -1.24639,1.25665 0,0.74278 0.83657,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.58449 -0.52159,-1.06913 -1.2464,-1.25665 v -13.64291 c 0.72481,-0.18508 1.2464,-0.66972 1.2464,-1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203909"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 323.4465,231.54146 c -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83658,1.34675 1.8696,1.34675 0.28789,0 0.55208,-0.056 0.79594,-0.13881 l 12.48431,8.98892 c -0.11516,0.17535 -0.19306,0.36531 -0.19306,0.57231 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -0.28789,0 -0.55208,0.056 -0.79594,0.13881 l -12.48431,-8.98892 c 0.11854,-0.17535 0.19306,-0.3653 0.19306,-0.57231 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203906"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#cf57b94926)"
					id="g5888"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 378.96875,410.47266 c 0.93359,0 1.71094,-0.60547 2.01172,-1.4375 h 47.72656 c 0.30078,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71094,0.60547 -2.01172,1.4375 h -47.72656 c -0.30078,-0.83203 -1.07813,-1.4375 -2.01172,-1.4375 -1.19141,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96484,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203903"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 375.79525,298.84761 c 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.0536 -0.79254,0.13882 l -6.42845,-4.6272 h -13.46991 c -0.25741,-0.51873 -0.93141,-0.89621 -1.74428,-0.89621 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83658,1.34432 1.8696,1.34432 0.81287,0 1.48687,-0.37749 1.74428,-0.89622 h 12.9551 l 6.05926,4.36174 c -0.11516,0.17534 -0.19306,0.36774 -0.19306,0.57475 0,0.74278 0.83658,1.34432 1.8696,1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203897"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#024131cb33)"
					id="g5898"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,0.62345308,-42.534118,59.090931)"
				>
					<path
						fill="#3a7cc3"
						d="m 268.85156,219.02734 h 30.48047 c 0.29688,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.00781,1.4414 h -30.48047 c -0.29687,-0.83593 -1.07422,-1.4414 -2.01172,-1.4414 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203894"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 158.91847,277.30925 c 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48348,0.37749 -1.74428,0.89865 h -20.9483 l -13.90345,10.00935 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83658,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57232 l 13.53766,-9.74876 h 20.43348 c 0.2608,0.52117 0.9348,0.89622 1.74428,0.89622 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203891"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 187.09115,210.90176 h -11.47161 c -0.25741,-0.52117 -0.93142,-0.89866 -1.74428,-0.89866 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81286,0 1.48687,-0.37748 1.74428,-0.89865 h 11.46822 c 0.2608,0.52117 0.9348,0.89865 1.74428,0.89865 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48348,0.37749 -1.74089,0.89866 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203888"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 351.49047,222.11904 c 0,0.74278 0.83658,1.34675 1.8696,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25665 v -13.64047 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58449 0.52498,1.06913 1.2464,1.25665 v 13.64047 c -0.72142,0.18752 -1.2464,0.67216 -1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203885"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,238.72091 h 11.46823 c 0.2608,0.52117 0.9348,0.89865 1.74428,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48348,0.37749 -1.74428,0.89622 h -11.46823 c -0.2574,-0.51873 -0.93141,-0.89622 -1.74428,-0.89622 -1.03301,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83659,1.34675 1.8696,1.34675 0.81287,0 1.48688,-0.37748 1.74428,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203882"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 213.13682,249.04198 c 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.02963,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52498,1.06913 1.24979,1.25422 v 9.70005 l 6.42166,4.62719 c -0.11515,0.17535 -0.19306,0.36531 -0.19306,0.57231 0,0.74279 0.83997,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74522 -0.83657,-1.34675 -1.8696,-1.34675 -0.2845,0 -0.54868,0.056 -0.79254,0.13881 l -6.05926,-4.36174 v -9.32987 c 0.72142,-0.18509 1.24301,-0.66973 1.24301,-1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203879"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 226.48142,271.02845 13.90683,-10.00935 c 0.24386,0.0828 0.50804,0.13882 0.79593,0.13882 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.20701 0.0745,0.39697 0.18967,0.57232 l -13.53765,9.74876 h -5.47671 c -0.2574,-0.52117 -0.93141,-0.89866 -1.74428,-0.89866 -1.02963,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74279 0.83997,1.34432 1.8696,1.34432 0.81287,0 1.48688,-0.37505 1.74428,-0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203876"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 383.89684,296.24663 v -4.31546 l -15.13629,-10.90069 -0.18629,-0.12907 h -5.99151 c -0.25742,-0.52116 -0.93142,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83657,1.34432 1.8696,1.34432 0.81286,0 1.48686,-0.37505 1.74428,-0.89622 h 5.4767 l 14.59099,10.50617 v 3.94284 c -0.72142,0.18753 -1.24639,0.67217 -1.24639,1.25666 0,0.74278 0.83657,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.58449 -0.52159,-1.07156 -1.2464,-1.25666 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203873"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 186.96244,286.73411 c 0,0.74278 0.83659,1.34432 1.8696,1.34432 0.81287,0 1.48688,-0.37505 1.74428,-0.89622 h 5.47671 l 13.53765,9.74633 c -0.11515,0.17534 -0.19306,0.36774 -0.19306,0.57475 0,0.74278 0.83997,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -0.2845,0 -0.54868,0.0536 -0.79254,0.13882 l -13.72394,-9.88028 -0.18289,-0.1315 h -5.99153 c -0.2574,-0.51874 -0.93141,-0.89622 -1.74428,-0.89622 -1.03301,0 -1.8696,0.60154 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203870"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 345.88168,282.69384 c 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.207 0.0779,0.39696 0.19306,0.57231 l -12.48431,8.98893 c -0.24386,-0.0852 -0.50805,-0.13882 -0.79594,-0.13882 -1.03302,0 -1.86959,0.60154 -1.86959,1.34676 0,0.74278 0.83657,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0745,-0.3994 -0.19306,-0.57232 l 12.48431,-8.98892 c 0.24387,0.0828 0.50805,0.13638 0.79594,0.13638 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203867"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,286.28357 c -0.2574,-0.51874 -0.93141,-0.89622 -1.74428,-0.89622 -1.03301,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83659,1.34432 1.8696,1.34432 0.81287,0 1.48688,-0.37505 1.74428,-0.89622 h 5.99153 l 6.42504,-4.62475 c 0.24386,0.0828 0.50805,0.13638 0.79594,0.13638 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.207 0.0779,0.39696 0.19306,0.57231 l -6.05926,4.36174 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203864"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 308.48972,218.0812 c 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -0.28789,0 -0.55208,0.056 -0.79594,0.13882 l -6.42505,-4.62475 h -5.99152 c -0.26079,-0.52117 -0.9348,-0.89866 -1.74428,-0.89866 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 5.4767 l 6.05927,4.36417 c -0.11855,0.17535 -0.19306,0.36531 -0.19306,0.57231 0,0.74278 0.83657,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203861"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 209.52633,265.64386 c 0.25741,0.52116 0.93141,0.89865 1.74089,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74522 -0.83658,-1.34675 -1.8696,-1.34675 -0.80948,0 -1.48348,0.37748 -1.74089,0.89621 h -5.99153 l -6.42843,4.62719 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.02963,0 -1.86959,0.60154 -1.86959,1.34676 0,0.74279 0.83996,1.34432 1.86959,1.34432 1.03303,0 1.8696,-0.60153 1.8696,-1.34432 0,-0.20701 -0.0745,-0.39696 -0.18967,-0.57231 l 6.05926,-4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203855"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 196.31043,207.31203 c 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.80947,0 -1.48347,0.37749 -1.74089,0.89866 h -18.95 c -0.25741,-0.52117 -0.93142,-0.89866 -1.74428,-0.89866 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81286,0 1.48687,-0.37748 1.74428,-0.89865 h 18.95 c 0.25742,0.52117 0.93142,0.89865 1.74089,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203852"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 308.48972,271.92466 c 1.03302,0 1.86959,-0.60153 1.86959,-1.34432 0,-0.74522 -0.83657,-1.34676 -1.86959,-1.34676 -0.81287,0 -1.48687,0.37749 -1.74429,0.89866 h -12.9551 l -6.05925,-4.36418 c 0.11516,-0.17534 0.19306,-0.3653 0.19306,-0.57231 0,-0.74522 -0.83658,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60153 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 6.42505,4.62476 h 13.46991 c 0.2608,0.52116 0.93142,0.89621 1.74429,0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203849"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,307.82192 c -0.2574,-0.51873 -0.93141,-0.89621 -1.74428,-0.89621 -1.03301,0 -1.8696,0.60153 -1.8696,1.34675 0,0.74279 0.83659,1.34433 1.8696,1.34433 0.81287,0 1.48688,-0.37749 1.74428,-0.89622 h 5.99153 l 6.42504,-4.62719 c 0.24386,0.0852 0.50805,0.13882 0.79594,0.13882 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.207 0.0779,0.39696 0.19306,0.57231 l -6.05926,4.36173 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203846"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 286.84708,296.29535 c -0.24047,-0.0852 -0.50465,-0.13882 -0.79254,-0.13882 -1.03303,0 -1.8696,0.60154 -1.8696,1.34676 0,0.74278 0.83657,1.34432 1.8696,1.34432 1.03302,0 1.8696,-0.60154 1.8696,-1.34432 0,-0.20701 -0.0779,-0.39941 -0.19306,-0.57475 l 6.42505,-4.62475 v -4.31547 c 0.72142,-0.18509 1.2464,-0.66973 1.2464,-1.25421 0,-0.74522 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60154 -1.8696,1.34676 0,0.58448 0.52498,1.06912 1.2464,1.25421 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203843"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 330.92489,215.38769 c -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83657,1.34675 1.86959,1.34675 0.81287,0 1.48687,-0.37747 1.74429,-0.89864 h 11.46822 c 0.26079,0.52117 0.9348,0.89864 1.74428,0.89864 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48349,0.37749 -1.74428,0.89866 h -11.46822 c -0.25742,-0.52117 -0.93142,-0.89866 -1.74429,-0.89866 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203840"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 194.44084,265.19575 c 0,0.74279 0.83996,1.34676 1.86959,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58448 -0.52159,-1.06913 -1.2464,-1.25665 v -13.6429 c 0.72481,-0.18509 1.2464,-0.66973 1.2464,-1.25422 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -1.02963,0 -1.86959,0.60397 -1.86959,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25422 v 13.6429 c -0.72142,0.18752 -1.2464,0.67217 -1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203837"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 220.48989,260.25927 h 11.47162 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 1.02963,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83997,-1.34675 -1.8696,-1.34675 -0.81287,0 -1.48687,0.37748 -1.74428,0.89621 h -11.47162 c -0.2574,-0.51873 -0.93141,-0.89621 -1.74428,-0.89621 -1.02963,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83997,1.34676 1.8696,1.34676 0.81287,0 1.48688,-0.37748 1.74428,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203831"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#c3dfdef643-2)"
					id="g5726-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 206.46484,410.47266 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 6.91016 l 43.33984,-43.39454 0.20703,-0.21093 v -61.05078 l -50.53515,-50.60547 c 0.13281,-0.28125 0.22265,-0.58594 0.22265,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 50.11328,50.17969 v 59.85937 l -42.70312,42.76172 h -6.31641 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203828"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 391.37524,320.10271 v 47.38974 l -7.84419,5.6476 h -44.87036 l -21.01604,15.13335 c 0.11516,0.17535 0.19306,0.36531 0.19306,0.57232 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.056 0.79593,0.13882 l 21.19895,-15.26243 0.18288,-0.13151 h 44.87036 l 7.11261,-5.12157 v -47.01956 c -0.72142,-0.18753 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.86959,0.60153 1.86959,1.34432 0,0.58448 -0.52158,1.07156 -1.24639,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203822"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#a9f825f88d-7)"
					id="g5736-2"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 501.875,408.31641 c 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.00781,1.4375 h -40.82032 l -58.73828,-58.81641 c 0.13282,-0.28125 0.22266,-0.58593 0.22266,-0.91797 0,-1.19531 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96484,2.15625 2.15625,2.15625 0.33203,0 0.63672,-0.0859 0.91797,-0.21875 l 58.94922,59.02735 0.21093,0.21094 h 41.41016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203819"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 293.79033,400.063 h -67.30891 l -13.53427,9.74876 c 0.11516,0.17534 0.18967,0.3653 0.18967,0.57231 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -1.02963,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83997,-1.34675 1.8696,-1.34675 0.28789,0 0.55207,0.056 0.79594,0.13881 l 13.72054,-9.87784 0.1829,-0.13151 h 67.30892 l 58.40801,-42.05629 c -0.11516,-0.17535 -0.19306,-0.3653 -0.19306,-0.57231 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -58.59091,42.18537 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203816"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 278.83355,323.78254 h 20.43349 c 0.25741,-0.52117 0.93141,-0.89621 1.74428,-0.89621 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -20.94831 l -14.95678,-10.76674 h -29.40214 l -7.47839,5.38459 h -65.81867 c -0.2574,0.51873 -0.93141,0.89621 -1.74428,0.89621 -1.03301,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.74279 0.83659,-1.34432 1.8696,-1.34432 0.81287,0 1.48688,0.37748 1.74428,0.89621 h 65.30385 l 7.47839,-5.38459 h 30.43177 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203813"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 392.62163,383.46113 c 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25422 v -8.25831 c -0.72142,-0.18753 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.58448 -0.52158,1.06912 -1.24639,1.25665 v 8.25831 c 0.72481,0.18509 1.24639,0.66973 1.24639,1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203810"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#e371159ec0-6)"
					id="g5746-0"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,375.92578 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 32.78516 l 26.08984,-26.12109 0.20703,-0.21094 v -17.87109 l -7.40625,-7.41797 c 0.13282,-0.28125 0.21875,-0.58594 0.21875,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 6.98828,6.99609 v 16.67969 l -25.45312,25.48437 h -32.19141 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203807"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#1aacbe7e75-4)"
					id="g5750-0"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.377384,567.72103)"
				>
					<path
						fill="#3a7cc3"
						d="m 266.83984,289.5625 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.32812,0 -0.63672,0.0898 -0.91406,0.22265 l -50.11719,-50.17968 v -14.96094 c 0.83203,-0.30078 1.4375,-1.07813 1.4375,-2.01563 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,0.9375 0.60547,1.71485 1.4375,2.01563 v 15.55469 l 50.53516,50.60546 c -0.13281,0.28125 -0.22266,0.58594 -0.22266,0.91797 0,1.19141 0.96485,2.16016 2.15625,2.16016 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203804"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 173.61785,330.06578 -6.42505,-4.62719 c -0.24386,0.0852 -0.50805,0.13881 -0.79594,0.13881 -1.03301,0 -1.86959,-0.60153 -1.86959,-1.34675 0,-0.74279 0.83658,-1.34432 1.86959,-1.34432 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.207 -0.0745,0.39696 -0.18967,0.57231 l 6.05588,4.36417 h 6.96357 l 6.05926,-4.36417 c -0.11515,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83659,-1.34432 1.8696,-1.34432 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.0536 -0.79593,-0.13881 l -6.42505,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203801"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#01b6702168-0)"
					id="g5756-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 499.71875,216.14844 c -0.93359,0 -1.71094,0.60547 -2.01172,1.4414 h -58.66016 l -24.66406,24.69141 c -0.27734,-0.13281 -0.58203,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96875 -2.15625,2.16016 0,1.19141 0.96484,2.16016 2.15625,2.16016 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.33203 -0.0898,-0.63672 -0.22266,-0.91797 l 24.23828,-24.27344 h 58.07032 c 0.29687,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203798"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 164.52727,367.30736 c 0,-0.74278 0.83658,-1.34675 1.86959,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.58448 -0.52159,1.06913 -1.2464,1.25665 v 9.69761 l -7.84418,5.64761 h -7.99321 l -6.42505,-4.62475 c -0.24386,0.0828 -0.50804,0.13881 -0.79593,0.13881 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.207 -0.0745,0.39696 -0.19305,0.57231 l 6.05926,4.36417 h 6.96358 l 7.11259,-5.12157 v -9.32744 c -0.72142,-0.18752 -1.24639,-0.67217 -1.24639,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203795"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#1fe81e7f15-8)"
					id="g5762-2"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 361.71875,324.10937 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.33203,0 -0.63672,0.0899 -0.91797,0.22266 l -41.69922,-41.75781 -0.21484,-0.20704 h -51.75 l -42.70313,-42.76171 v -8.04297 l 8.20313,-8.21485 h 6.3164 c 0.30079,0.83594 1.07813,1.44141 2.01172,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.01172,1.4414 h -6.91015 l -9.04688,9.0586 v 9.23047 l 43.33594,43.39453 0.21094,0.21093 h 51.75 l 41.48828,41.54688 c -0.13281,0.28125 -0.21875,0.58594 -0.21875,0.91797 0,1.1914 0.96484,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203792"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#ef8cb358c1-0)"
					id="g5766-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,324.10937 c 0.9375,0 1.71094,-0.60546 2.01172,-1.4414 h 21.85156 c 0.30079,0.83594 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -21.85156 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203789"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#28c256b738-6)"
					id="g5770-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 439.04687,409.03516 h 6.91016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.01172,1.4375 h -6.31641 l -77.41406,-77.51953 -0.21094,-0.21094 h -9.21875 l -41.91406,41.96875 c -0.28125,-0.13672 -0.58594,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96484,2.15625 2.15625,2.15625 1.1875,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22266,-0.92187 l 41.48828,-41.54297 h 8.03125 l 77.41407,77.51953 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203786"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#c0fb14b776-4)"
					id="g5774-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 413.46875,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.9375,0 -1.71484,0.60547 -2.01172,1.4414 h -93.16406 l -34.4961,34.54688 h -32.19531 c -0.29687,-0.83594 -1.07422,-1.44141 -2.01172,-1.44141 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.9375,0 1.71485,-0.60546 2.01172,-1.4414 h 32.78906 l 34.4961,-34.54688 h 92.57031 c 0.29688,0.83594 1.07422,1.44141 2.01172,1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203783"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 338.66069,378.52464 -67.12264,48.32979 -0.18289,0.13151 h -13.46991 c -0.2608,0.52117 -0.9348,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48348,0.37748 1.74428,0.89865 h 12.95509 l 67.12265,-48.32979 0.18288,-0.13151 h 7.99321 l 7.84419,5.64761 v 10.76917 l 28.49444,20.51551 c 0.24386,-0.0828 0.50804,-0.13882 0.79593,-0.13882 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.20701 0.0779,-0.39697 0.19306,-0.57231 l -28.67734,-20.64702 -0.1829,-0.13394 v -10.76918 l -7.1126,-5.12157 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203780"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,406.34624 c -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -65.30723 l -7.11261,5.12157 v 5.01441 l 13.54104,9.74633 c 0.24386,-0.0828 0.50805,-0.13882 0.79594,-0.13882 1.02963,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83997,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0745,-0.39697 0.18967,-0.57231 l -13.72055,-9.87784 -0.1829,-0.13394 v -5.75477 l 7.84419,-5.64761 h 65.82205 c 0.25741,-0.52116 0.93141,-0.89864 1.74428,-0.89864 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203777"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#8f1e156615-9)"
					id="g5784-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,315.47266 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.9375 -0.60547,-1.71484 -1.4375,-2.01563 v -6.32421 l 24.23828,-24.26954 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33204 0.0898,0.63672 0.22266,0.91797 l -24.45313,24.48438 -0.20703,0.21094 v 6.91796 c -0.83203,0.30079 -1.4375,1.07813 -1.4375,2.01563 0,1.19141 0.96485,2.16016 2.15625,2.16016 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203771"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 269.22815,410.38407 c 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.58449 -0.52498,1.06913 -1.2464,1.25665 v 8.25588 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52159,-1.06912 1.2464,-1.25665 v -8.25832 c -0.72481,-0.18508 -1.2464,-0.66972 -1.2464,-1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203768"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 301.26873,421.60135 h -5.99152 c -0.26079,0.52117 -0.9348,0.89866 -1.74428,0.89866 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 5.4767 l 44.50457,-32.04451 v -3.94286 c -0.72142,-0.18752 -1.2464,-0.67216 -1.2464,-1.25664 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25664 v 4.31303 l -45.05325,32.44148 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203765"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 337.96299,335.31886 -0.1829,-0.13151 v -5.7572 l 15.13968,-10.90069 0.18289,-0.13151 h 28.4267 c 0.2608,-0.51873 0.93481,-0.89621 1.74428,-0.89621 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -0.80947,0 -1.48348,-0.37748 -1.74428,-0.89621 h -27.91188 l -14.59099,10.50616 v 5.01197 l 37.21245,26.79144 0.17951,0.13151 v 4.31546 c 0.72481,0.18509 1.2464,0.66973 1.2464,1.25422 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52498,-1.06913 1.2464,-1.25422 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203762"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 256.76417,367.49245 -22.61808,16.28527 -0.18628,0.13151 h -37.90678 l -7.84419,-5.64761 V 350.9685 l 21.38184,-15.39636 c -0.11515,-0.17292 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83997,-1.34433 1.8696,-1.34433 1.03302,0 1.8696,0.60154 1.8696,1.34433 0,0.74522 -0.83658,1.34675 -1.8696,1.34675 -0.2845,0 -0.54868,-0.0536 -0.79254,-0.13881 l -21.01944,15.13091 v 26.55277 l 7.11261,5.12157 h 36.87714 l 22.07278,-15.89075 v -5.01198 l -6.05926,-4.36417 c -0.24386,0.0828 -0.50805,0.13882 -0.79594,0.13882 -1.03302,0 -1.86959,-0.60154 -1.86959,-1.34676 0,-0.74278 0.83657,-1.34432 1.86959,-1.34432 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0779,0.39696 -0.19306,0.57231 l 6.42506,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203759"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 241.18418,409.03732 c 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -6.42844,4.62476 h -5.99152 c -0.25741,0.52116 -0.93142,0.89865 -1.74089,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.80947,0 1.48348,0.37748 1.74089,0.89865 h 5.4767 l 6.05926,-4.36417 c -0.11515,-0.17535 -0.18967,-0.36531 -0.18967,-0.57231 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203756"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,390.19247 c -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0779,-0.39697 0.19306,-0.57232 l -6.42506,-4.62719 v -4.31303 c -0.72142,-0.18752 -1.24639,-0.67216 -1.24639,-1.25664 0,-0.74279 0.83657,-1.34676 1.86959,-1.34676 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52159,1.06912 -1.2464,1.25664 v 3.94286 l 6.05926,4.36174 c 0.24386,-0.0828 0.50805,-0.13882 0.79594,-0.13882 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203753"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,395.57706 c -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -48.86358 c -0.2574,0.52117 -0.93141,0.89865 -1.74089,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.80948,0 1.48349,0.37748 1.74428,0.89865 h 48.86019 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203750"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 353.36007,349.80927 c 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -43.63412,31.41619 -0.1829,0.13151 h -20.9483 c -0.26079,0.52117 -0.93141,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48349,0.37748 1.74428,0.89865 h 20.43348 l 43.45123,-31.28712 c -0.11516,-0.17535 -0.19306,-0.3653 -0.19306,-0.57231 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203747"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 211.89381,355.28397 c 0.72142,0.18509 1.24301,0.66972 1.24301,1.25421 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -1.02963,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.58449 0.52498,-1.06912 1.24979,-1.25421 v -15.08465 l 30.09647,-21.66986 0.18289,-0.13151 h 22.94999 l 15.13969,10.90069 0.18289,0.13151 v 21.90853 l -7.84418,5.6476 h -7.99321 l -6.42505,-4.62475 c -0.24386,0.0828 -0.50804,0.13882 -0.79593,0.13882 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.86959,0.60154 1.86959,1.34432 0,0.20701 -0.0779,0.39696 -0.19305,0.57231 l 6.05925,4.36417 h 6.96358 l 7.11261,-5.12157 v -21.16574 l -14.591,-10.50616 h -21.92036 l -29.54778,21.27534 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203744"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,427.88459 c -0.80948,0 -1.48349,-0.37748 -1.7409,-0.89865 H 338.14587 L 324.24244,416.9766 c -0.24386,0.0828 -0.50805,0.13882 -0.79594,0.13882 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 13.53765,9.74876 h 50.34706 c 0.2608,-0.52117 0.93481,-0.89865 1.74429,-0.89865 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203741"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 239.31458,324.23065 c 0,-0.74279 0.83658,-1.34432 1.8696,-1.34432 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.58448 -0.52498,1.06912 -1.2464,1.25665 v 13.6429 c 0.72142,0.18509 1.2464,0.66973 1.2464,1.25421 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.58448 0.52159,-1.06912 1.2464,-1.25421 v -13.6429 c -0.72481,-0.18509 -1.2464,-0.67217 -1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203738"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,422.50001 c -0.80948,0 -1.48349,-0.37749 -1.7409,-0.89866 h -20.95169 l -7.84418,-5.6476 v -9.69762 c -0.72142,-0.18752 -1.2464,-0.67216 -1.2464,-1.25665 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.58449 -0.52159,1.06913 -1.2464,1.25665 v 9.32744 l 7.1126,5.12157 h 20.43349 c 0.2608,-0.52117 0.93481,-0.89865 1.74429,-0.89865 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203735"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.75204,417.11542 c -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52498,-1.06912 1.2464,-1.25665 v -20.09662 l -7.11261,-5.11914 h -5.4767 c -0.25741,0.51874 -0.93141,0.89622 -1.74428,0.89622 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 5.99152 l 7.84419,5.6476 v 20.4668 c 0.72481,0.18753 1.24639,0.67216 1.24639,1.25665 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203732"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f1bcfcfd5a-9)"
					id="g5814-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,367.28906 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22265,-0.92187 l 50.32812,-50.39063 0.20703,-0.21094 v -6.92187 c 0.83594,-0.29688 1.4375,-1.07422 1.4375,-2.01172 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 6.32812 l -50.11328,50.17969 c -0.28125,-0.13672 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203729"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#beeac1b475-8)"
					id="g5818-2"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,384.5625 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 13.22656 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -13.22656 c -0.30078,-0.83203 -1.07812,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203726"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 256.93351,411.59201 c -0.24047,0.0828 -0.50465,0.13882 -0.79254,0.13882 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.207 -0.0779,0.39696 -0.19305,0.57231 l 6.42505,4.62719 v 4.31303 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52159,-1.06912 1.2464,-1.25665 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203723"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#5946722d62-0)"
					id="g5824-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 232.33984,224.78516 c -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 h 67.28906 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.1875,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96875,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0859,0.63672 0.21875,0.91797 l -6.98828,7 h -66.69141 c -0.29687,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203720"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#f773d7ee6f-7)"
					id="g5828-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 312.125,408.31641 c 0,-1.19532 -0.96875,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71484,0.60547 -2.01172,1.4375 h -82.23047 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 82.23047 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.1875,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203717"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 336.53369,351.15359 c 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.58449 -0.52498,1.06913 -1.2464,1.25665 v 4.31303 l -30.09647,21.66986 -0.1829,0.13151 h -44.87036 l -13.53765,9.74876 c 0.11517,0.17535 0.19306,0.36531 0.19306,0.57232 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83657,-1.34676 1.86959,-1.34676 0.28789,0 0.55208,0.056 0.79594,0.13882 l 13.71716,-9.87784 0.18628,-0.13151 h 44.87035 l 29.54779,-21.27534 v -3.94285 c -0.72142,-0.18752 -1.2464,-0.67216 -1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203714"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 158.91847,357.88494 c -0.81287,0 -1.48348,-0.37749 -1.74428,-0.89866 h -11.46822 c -0.25741,0.52117 -0.93142,0.89866 -1.74428,0.89866 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 0.81286,0 1.48348,0.37505 1.74428,0.89621 h 11.46822 c 0.2608,-0.52116 0.9348,-0.89621 1.74428,-0.89621 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203711"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 301.01132,390.19247 c -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89622 h -20.94831 l -7.47839,-5.38702 h -6.96358 l -6.05925,4.36417 c 0.11516,0.17535 0.19305,0.36531 0.19305,0.57232 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.056 0.79254,0.13882 l 6.42844,-4.62476 h 7.99321 l 7.47839,5.38459 h 20.43349 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203708"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="M 255.51777,340.57194 V 325.4873 c -0.72481,-0.18509 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.86959,0.60153 1.86959,1.34432 0,0.58448 -0.52497,1.07156 -1.24639,1.25665 v 14.71202 l 13.53765,9.74633 c 0.24386,-0.0828 0.50804,-0.13638 0.79593,-0.13638 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.20701 0.0745,-0.39696 0.18967,-0.57231 l -13.72055,-9.87783 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203705"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 293.53293,352.50035 c -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -13.53766,9.74876 v 3.94285 c 0.72142,0.18509 1.2464,0.66973 1.2464,1.25422 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.58449 0.52498,-1.06913 1.2464,-1.25422 v -4.31546 l 13.90344,-10.01178 c -0.11854,-0.17535 -0.19306,-0.3653 -0.19306,-0.57231 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203702"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 331.54809,356.72327 -22.61807,16.28771 -0.1829,0.12907 h -35.90509 c -0.26079,0.52117 -0.9348,0.89866 -1.74428,0.89866 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.80948,0 1.48349,0.37748 1.74428,0.89865 h 35.39027 l 22.06939,-15.89075 v -5.01441 l -6.05925,-4.36173 c -0.24386,0.0828 -0.50805,0.13881 -0.79594,0.13881 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0745,0.39697 -0.19306,0.57232 l 6.42505,4.62718 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203699"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 345.88168,368.65412 c -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 0.28789,0 0.55207,0.056 0.79593,0.13881 l 6.42505,-4.62476 h 5.99152 c 0.2608,-0.52116 0.93481,-0.89864 1.74429,-0.89864 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.74522 -0.83657,1.34676 -1.86959,1.34676 -0.80948,0 -1.48349,-0.37749 -1.74429,-0.89622 h -5.4767 l -6.05926,4.36174 c 0.11854,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203696"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 142.09209,367.30736 c 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.58448 -0.52498,1.06913 -1.2464,1.25665 v 4.31303 l -13.90343,10.01178 c 0.11515,0.17534 0.19305,0.3653 0.19305,0.57231 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.056 0.79593,0.13882 l 13.53766,-9.74633 v -3.94285 c -0.72142,-0.18752 -1.2464,-0.67217 -1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203693"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f78a6aa82b-9)"
					id="g5848-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 195.68359,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71875 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203690"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 369.11279,352.36153 c -0.24386,0.0828 -0.50804,0.13882 -0.79593,0.13882 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0745,0.39696 -0.18967,0.57231 l 13.72055,9.88027 0.1795,0.13151 v 4.31546 c 0.72481,0.18509 1.2464,0.66973 1.2464,1.25422 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.58449 0.52497,-1.06913 1.24639,-1.25422 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203687"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 315.96811,419.80649 c 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.81287,0 -1.48349,-0.37749 -1.74428,-0.89866 h -5.47671 l -7.47839,5.38459 h -20.9483 c -0.2608,0.52117 -0.93481,0.89865 -1.74429,0.89865 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83657,-1.34676 1.86959,-1.34676 0.80948,0 1.48349,0.37748 1.74429,0.89865 h 20.43348 l 7.47839,-5.38459 h 5.99153 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203684"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 188.20884,333.74561 v -4.31546 l 6.42506,-4.62719 c -0.11516,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83996,-1.34432 1.86959,-1.34432 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13881 l -6.05926,4.36417 v 3.94285 c 0.72481,0.18509 1.2464,0.66973 1.2464,1.25422 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -1.03301,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203681"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 324.0697,356.72327 -13.90345,10.01178 c 0.11517,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 0.28789,0 0.55207,0.056 0.79593,0.13881 l 13.53765,-9.74633 v -5.01441 l -6.05926,-4.36173 c -0.24386,0.0828 -0.50804,0.13881 -0.79593,0.13881 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0779,0.39697 -0.19306,0.57232 l 6.42505,4.62718 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203678"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 338.40329,417.11542 c -0.80948,0 -1.48349,-0.37749 -1.74428,-0.89865 h -5.99153 l -6.42504,-4.62476 c -0.24386,0.0828 -0.50805,0.13882 -0.79594,0.13882 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.207 -0.0745,0.39696 -0.19306,0.57231 l 6.05926,4.36417 h 5.47671 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203675"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 249.10288,361.60617 0.18289,0.13151 v 5.75477 l -6.42505,4.62719 c 0.11516,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55208,0.056 0.79255,0.13882 l 6.06264,-4.36174 v -5.01198 l -14.77727,-10.63767 -0.1829,-0.13394 v -4.31303 c -0.72142,-0.18752 -1.24301,-0.67216 -1.24301,-1.25665 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.02963,0 1.8696,0.60154 1.8696,1.34432 0,0.58449 -0.52498,1.07156 -1.24979,1.25665 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203672"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 314.09851,356.53818 c 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -0.28789,0 -0.55208,-0.056 -0.79594,-0.13882 l -13.72054,9.88027 -0.1829,0.13151 h -13.46991 c -0.26079,0.51873 -0.9348,0.89622 -1.74428,0.89622 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 0.80948,0 1.48349,0.37747 1.74428,0.89864 h 12.95509 l 13.53766,-9.74876 c -0.11854,-0.17535 -0.19306,-0.3653 -0.19306,-0.57231 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203669"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#23ff1b1a5d-5)"
					id="g5866-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 422.09375,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0898,0.63672 0.22266,0.91797 l -6.98829,7 h -6.3164 c -0.29688,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96484,2.16016 2.15625,2.16016 0.9375,0 1.71484,-0.60547 2.01172,-1.44141 h 6.91015 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203666"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#16634a2329-9)"
					id="g5870-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,350.01562 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.63671 -0.22265,-0.91796 l 15.61328,-15.63672 h 6.3164 c 0.29688,0.83593 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -6.91015 l -16.03516,16.05859 c -0.28125,-0.13281 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203663"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 271.72095,339.1302 c 0.72142,0.18509 1.2464,0.66973 1.2464,1.25421 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.58448 0.52159,-1.06912 1.2464,-1.25421 v -9.32744 l -6.06265,-4.36417 c -0.24047,0.0852 -0.50465,0.13881 -0.79254,0.13881 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60153 1.8696,1.34432 0,0.207 -0.0779,0.3994 -0.19306,0.57231 l 6.42505,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203660"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#bc99b6b289-5)"
					id="g5876-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 187.05859,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71485 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203657"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 355.10435,378.52464 c -0.25741,0.52117 -0.93141,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 5.99152 l 6.42844,4.62476 c 0.24047,-0.0828 0.50466,-0.13882 0.79255,-0.13882 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0779,-0.39697 0.19306,-0.57231 l -6.05927,-4.36418 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203654"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 368.31686,341.73117 c -0.80948,0 -1.48349,-0.37748 -1.74428,-0.89622 h -13.46992 l -7.84418,-5.6476 v -5.7572 l 7.84418,-5.64761 h 28.4267 c 0.2608,-0.52117 0.93481,-0.89621 1.74428,-0.89621 1.03303,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83657,1.34675 -1.8696,1.34675 -0.80947,0 -1.48348,-0.37748 -1.74428,-0.89865 h -27.91188 l -7.1126,5.12401 v 5.01197 l 7.1126,5.12158 h 12.9551 c 0.26079,-0.52117 0.9348,-0.89622 1.74428,-0.89622 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203651"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 385.14324,356.53818 c 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.86959,-0.60154 -1.86959,-1.34676 0,-0.58449 0.52497,-1.06912 1.24639,-1.25421 v -13.64291 c -0.72142,-0.18752 -1.24639,-0.67216 -1.24639,-1.25665 0,-0.74278 0.83657,-1.34432 1.86959,-1.34432 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.58449 -0.52159,1.06913 -1.2464,1.25665 v 13.64291 c 0.72481,0.18509 1.2464,0.66972 1.2464,1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203648"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 323.4465,395.57706 c -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55208,0.056 0.79594,0.13882 l 12.48431,-8.98893 c -0.11516,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -0.28789,0 -0.55208,-0.056 -0.79594,-0.13881 l -12.48431,8.98892 c 0.11854,0.17535 0.19306,0.3653 0.19306,0.57232 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203645"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#cf57b94926-4)"
					id="g5888-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 378.96875,410.47266 c 0.93359,0 1.71094,-0.60547 2.01172,-1.4375 h 47.72656 c 0.30078,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71094,0.60547 -2.01172,1.4375 h -47.72656 c -0.30078,-0.83203 -1.07813,-1.4375 -2.01172,-1.4375 -1.19141,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96484,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203642"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 375.79525,328.27091 c 1.03302,0 1.8696,0.60154 1.8696,1.34433 0,0.74522 -0.83658,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.0536 -0.79254,-0.13881 l -6.42845,4.62719 h -13.46991 c -0.25741,0.51873 -0.93141,0.89621 -1.74428,0.89621 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34433 1.8696,-1.34433 0.81287,0 1.48687,0.37749 1.74428,0.89622 h 12.9551 l 6.05926,-4.36174 c -0.11516,-0.17534 -0.19306,-0.36774 -0.19306,-0.57474 0,-0.74279 0.83658,-1.34433 1.8696,-1.34433 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203636"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#024131cb33-5)"
					id="g5898-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(0.86706003,0,0,-0.62345308,-42.534118,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 268.85156,219.02734 h 30.48047 c 0.29688,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.00781,1.4414 h -30.48047 c -0.29687,-0.83593 -1.07422,-1.4414 -2.01172,-1.4414 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203633"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 158.91847,349.80927 c 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -0.80948,0 -1.48348,-0.37749 -1.74428,-0.89865 h -20.9483 l -13.90345,-10.00934 c -0.24386,0.0828 -0.50804,0.13881 -0.79593,0.13881 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34432 1.8696,-1.34432 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0779,0.39697 -0.19306,0.57232 l 13.53766,9.74876 h 20.43348 c 0.2608,-0.52117 0.9348,-0.89622 1.74428,-0.89622 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203630"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 187.09115,416.21677 h -11.47161 c -0.25741,0.52116 -0.93142,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81286,0 1.48687,0.37748 1.74428,0.89865 h 11.46822 c 0.2608,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.80948,0 -1.48348,-0.37749 -1.74089,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203627"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 351.49047,404.99948 c 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.58449 -0.52498,1.06913 -1.2464,1.25665 v 13.64047 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52498,-1.06912 1.2464,-1.25665 v -13.64047 c -0.72142,-0.18752 -1.2464,-0.67216 -1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203624"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,388.39761 h 11.46823 c 0.2608,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -0.80948,0 -1.48348,-0.37748 -1.74428,-0.89622 h -11.46823 c -0.2574,0.51874 -0.93141,0.89622 -1.74428,0.89622 -1.03301,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83659,-1.34676 1.8696,-1.34676 0.81287,0 1.48688,0.37748 1.74428,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203621"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 213.13682,378.07654 c 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.02963,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.24979,-1.25422 v -9.70005 l 6.42166,-4.62719 c -0.11515,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74278 0.83997,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74522 -0.83657,1.34676 -1.8696,1.34676 -0.2845,0 -0.54868,-0.056 -0.79254,-0.13882 l -6.05926,4.36174 v 9.32987 c 0.72142,0.18509 1.24301,0.66973 1.24301,1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203618"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 226.48142,356.09007 13.90683,10.00935 c 0.24386,-0.0828 0.50804,-0.13881 0.79593,-0.13881 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.20701 0.0745,-0.39697 0.18967,-0.57231 l -13.53765,-9.74877 h -5.47671 c -0.2574,0.52117 -0.93141,0.89866 -1.74428,0.89866 -1.02963,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83997,-1.34432 1.8696,-1.34432 0.81287,0 1.48688,0.37505 1.74428,0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203615"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 383.89684,330.87189 v 4.31546 l -15.13629,10.90069 -0.18629,0.12907 h -5.99151 c -0.25742,0.52116 -0.93142,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34432 1.8696,-1.34432 0.81286,0 1.48686,0.37505 1.74428,0.89622 h 5.4767 l 14.59099,-10.50617 v -3.94284 c -0.72142,-0.18753 -1.24639,-0.67217 -1.24639,-1.25665 0,-0.74279 0.83657,-1.34433 1.86959,-1.34433 1.03303,0 1.8696,0.60154 1.8696,1.34433 0,0.58448 -0.52159,1.07156 -1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203612"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 186.96244,340.38441 c 0,-0.74278 0.83659,-1.34432 1.8696,-1.34432 0.81287,0 1.48688,0.37505 1.74428,0.89622 h 5.47671 l 13.53765,-9.74633 c -0.11515,-0.17534 -0.19306,-0.36774 -0.19306,-0.57474 0,-0.74279 0.83997,-1.34433 1.8696,-1.34433 1.03302,0 1.8696,0.60154 1.8696,1.34433 0,0.74522 -0.83658,1.34675 -1.8696,1.34675 -0.2845,0 -0.54868,-0.0536 -0.79254,-0.13881 l -13.72394,9.88027 -0.18289,0.1315 h -5.99153 c -0.2574,0.51874 -0.93141,0.89622 -1.74428,0.89622 -1.03301,0 -1.8696,-0.60154 -1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203609"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 345.88168,344.42468 c 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.207 0.0779,-0.39696 0.19306,-0.57231 l -12.48431,-8.98892 c -0.24386,0.0852 -0.50805,0.13881 -0.79594,0.13881 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34675 0,-0.74279 0.83657,-1.34433 1.86959,-1.34433 1.03303,0 1.8696,0.60154 1.8696,1.34433 0,0.207 -0.0745,0.39939 -0.19306,0.57231 l 12.48431,8.98892 c 0.24387,-0.0828 0.50805,-0.13638 0.79594,-0.13638 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203606"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,340.83495 c -0.2574,0.51874 -0.93141,0.89622 -1.74428,0.89622 -1.03301,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83659,-1.34432 1.8696,-1.34432 0.81287,0 1.48688,0.37505 1.74428,0.89622 h 5.99153 l 6.42504,4.62475 c 0.24386,-0.0828 0.50805,-0.13638 0.79594,-0.13638 1.03302,0 1.8696,0.60154 1.8696,1.34432 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.207 0.0779,-0.39696 0.19306,-0.57231 l -6.05926,-4.36174 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203603"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 308.48972,409.03732 c 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 -0.28789,0 -0.55208,-0.056 -0.79594,-0.13882 l -6.42505,4.62476 h -5.99152 c -0.26079,0.52116 -0.9348,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 5.4767 l 6.05927,-4.36417 c -0.11855,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203600"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 209.52633,361.47466 c 0.25741,-0.52116 0.93141,-0.89864 1.74089,-0.89864 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -0.80948,0 -1.48348,-0.37749 -1.74089,-0.89622 h -5.99153 l -6.42843,-4.62719 c -0.24386,0.0828 -0.50805,0.13882 -0.79594,0.13882 -1.02963,0 -1.86959,-0.60154 -1.86959,-1.34676 0,-0.74278 0.83996,-1.34432 1.86959,-1.34432 1.03303,0 1.8696,0.60154 1.8696,1.34432 0,0.20701 -0.0745,0.39696 -0.18967,0.57231 l 6.05926,4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203594"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 196.31043,419.80649 c 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.80947,0 -1.48347,-0.37749 -1.74089,-0.89866 h -18.95 c -0.25741,0.52117 -0.93142,0.89866 -1.74428,0.89866 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81286,0 1.48687,0.37748 1.74428,0.89865 h 18.95 c 0.25742,-0.52117 0.93142,-0.89865 1.74089,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203591"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 308.48972,355.19386 c 1.03302,0 1.86959,0.60154 1.86959,1.34432 0,0.74522 -0.83657,1.34676 -1.86959,1.34676 -0.81287,0 -1.48687,-0.37749 -1.74429,-0.89866 h -12.9551 l -6.05925,4.36418 c 0.11516,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 0.28789,0 0.55207,0.056 0.79593,0.13881 l 6.42505,-4.62476 h 13.46991 c 0.2608,-0.52116 0.93142,-0.89621 1.74429,-0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203588"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 138.22757,319.2966 c -0.2574,0.51873 -0.93141,0.89621 -1.74428,0.89621 -1.03301,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.74279 0.83659,-1.34432 1.8696,-1.34432 0.81287,0 1.48688,0.37748 1.74428,0.89621 h 5.99153 l 6.42504,4.62719 c 0.24386,-0.0852 0.50805,-0.13881 0.79594,-0.13881 1.03302,0 1.8696,0.60153 1.8696,1.34432 0,0.74522 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.20701 0.0779,-0.39697 0.19306,-0.57232 l -6.05926,-4.36173 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203585"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 286.84708,330.82318 c -0.24047,0.0852 -0.50465,0.13881 -0.79254,0.13881 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34433 1.8696,-1.34433 1.03302,0 1.8696,0.60154 1.8696,1.34433 0,0.207 -0.0779,0.3994 -0.19306,0.57474 l 6.42505,4.62475 v 4.31547 c 0.72142,0.18509 1.2464,0.66973 1.2464,1.25421 0,0.74522 -0.83658,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34676 0,-0.58448 0.52498,-1.06912 1.2464,-1.25421 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203582"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 330.92489,411.73083 c -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.74278 0.83657,-1.34675 1.86959,-1.34675 0.81287,0 1.48687,0.37747 1.74429,0.89864 h 11.46822 c 0.26079,-0.52117 0.9348,-0.89864 1.74428,-0.89864 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.81287,0 -1.48349,-0.37749 -1.74428,-0.89865 h -11.46822 c -0.25742,0.52116 -0.93142,0.89865 -1.74429,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203579"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 194.44084,361.92277 c 0,-0.74278 0.83996,-1.34675 1.86959,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.58448 -0.52159,1.06913 -1.2464,1.25665 v 13.6429 c 0.72481,0.18509 1.2464,0.66973 1.2464,1.25422 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -1.02963,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25422 v -13.6429 c -0.72142,-0.18752 -1.2464,-0.67217 -1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203576"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 220.48989,366.85925 h 11.47162 c 0.25741,-0.52117 0.93141,-0.89864 1.74428,-0.89864 1.02963,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83997,1.34676 -1.8696,1.34676 -0.81287,0 -1.48687,-0.37749 -1.74428,-0.89622 h -11.47162 c -0.2574,0.51873 -0.93141,0.89622 -1.74428,0.89622 -1.02963,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83997,-1.34675 1.8696,-1.34675 0.81287,0 1.48688,0.37747 1.74428,0.89864 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203570"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#c3dfdef643-4)"
					id="g5726-2"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 206.46484,410.47266 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 6.91016 l 43.33984,-43.39454 0.20703,-0.21093 v -61.05078 l -50.53515,-50.60547 c 0.13281,-0.28125 0.22265,-0.58594 0.22265,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 50.11328,50.17969 v 59.85937 l -42.70312,42.76172 h -6.31641 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203567"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="M 390.01051,307.22694 V 259.8372 l 7.84418,-5.64761 h 44.87036 l 21.01604,-15.13335 c -0.11516,-0.17535 -0.19305,-0.36531 -0.19305,-0.57231 0,-0.74278 0.83657,-1.34675 1.86959,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -21.19894,15.26242 -0.18289,0.13151 h -44.87036 l -7.1126,5.12157 v 47.01957 c 0.72141,0.18752 1.24639,0.67216 1.24639,1.25665 0,0.74278 -0.83657,1.34432 -1.86959,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.58449 0.52159,-1.07156 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203561"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#a9f825f88d-3)"
					id="g5736-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 501.875,408.31641 c 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.00781,1.4375 h -40.82032 l -58.73828,-58.81641 c 0.13282,-0.28125 0.22266,-0.58593 0.22266,-0.91797 0,-1.19531 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96484,2.15625 2.15625,2.15625 0.33203,0 0.63672,-0.0859 0.91797,-0.21875 l 58.94922,59.02735 0.21093,0.21094 h 41.41016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203558"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 487.59541,227.26665 h 67.30891 l 13.53427,-9.74876 c -0.11516,-0.17535 -0.18967,-0.36531 -0.18967,-0.57231 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.02964,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83996,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13881 l -13.72055,9.87783 -0.1829,0.13151 h -67.30892 l -58.40801,42.05629 c 0.11516,0.17535 0.19306,0.3653 0.19306,0.57232 0,0.74278 -0.83658,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74523 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.056 0.79593,0.13882 l 58.59091,-42.18538 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203555"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="M 502.55219,303.5471 H 482.1187 c -0.25741,0.52117 -0.93141,0.89622 -1.74428,0.89622 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74522 0.83657,-1.34676 1.8696,-1.34676 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 20.94831 l 14.95679,10.76674 h 29.40213 l 7.47839,-5.38459 h 65.81867 c 0.2574,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.03302,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83658,1.34432 -1.8696,1.34432 -0.81287,0 -1.48688,-0.37748 -1.74428,-0.89622 h -65.30385 l -7.47839,5.38459 h -30.43177 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203552"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 388.76411,243.86852 c 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.58449 -0.52498,1.06913 -1.24639,1.25421 v 8.25832 c 0.72141,0.18752 1.24639,0.67216 1.24639,1.25665 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52159,-1.06913 1.2464,-1.25665 v -8.25832 c -0.72481,-0.18508 -1.2464,-0.66972 -1.2464,-1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203549"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#e371159ec0-0)"
					id="g5746-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,375.92578 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 32.78516 l 26.08984,-26.12109 0.20703,-0.21094 v -17.87109 l -7.40625,-7.41797 c 0.13282,-0.28125 0.21875,-0.58594 0.21875,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 6.98828,6.99609 v 16.67969 l -25.45312,25.48437 h -32.19141 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203546"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 607.76789,297.26386 6.42505,4.6272 c 0.24386,-0.0852 0.50805,-0.13882 0.79594,-0.13882 1.03301,0 1.8696,0.60154 1.8696,1.34676 0,0.74278 -0.83659,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.20701 0.0745,-0.39697 0.18967,-0.57231 l -6.05588,-4.36417 h -6.96357 l -6.05926,4.36417 c 0.11515,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74278 -0.83658,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.0536 0.79594,0.13882 l 6.42504,-4.6272 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203540"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#01b6702168-9)"
					id="g5756-60"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 499.71875,216.14844 c -0.93359,0 -1.71094,0.60547 -2.01172,1.4414 h -58.66016 l -24.66406,24.69141 c -0.27734,-0.13281 -0.58203,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96875 -2.15625,2.16016 0,1.19141 0.96484,2.16016 2.15625,2.16016 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.33203 -0.0898,-0.63672 -0.22266,-0.91797 l 24.23828,-24.27344 h 58.07032 c 0.29687,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203537"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 616.85848,260.02229 c 0,0.74278 -0.83659,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52159,-1.06913 1.2464,-1.25665 v -9.69762 l 7.84418,-5.64761 h 7.99321 l 6.42505,4.62476 c 0.24386,-0.0828 0.50805,-0.13882 0.79594,-0.13882 1.03301,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83659,1.34676 -1.8696,1.34676 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.20701 0.0745,-0.39697 0.19305,-0.57231 l -6.05926,-4.36418 h -6.96357 l -7.1126,5.12158 v 9.32744 c 0.72142,0.18752 1.2464,0.67216 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203534"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#1fe81e7f15-2)"
					id="g5762-3"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 361.71875,324.10937 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.33203,0 -0.63672,0.0899 -0.91797,0.22266 l -41.69922,-41.75781 -0.21484,-0.20704 h -51.75 l -42.70313,-42.76171 v -8.04297 l 8.20313,-8.21485 h 6.3164 c 0.30079,0.83594 1.07813,1.44141 2.01172,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.01172,1.4414 h -6.91015 l -9.04688,9.0586 v 9.23047 l 43.33594,43.39453 0.21094,0.21093 h 51.75 l 41.48828,41.54688 c -0.13281,0.28125 -0.21875,0.58594 -0.21875,0.91797 0,1.1914 0.96484,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203531"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#ef8cb358c1-3)"
					id="g5766-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,324.10937 c 0.9375,0 1.71094,-0.60546 2.01172,-1.4414 h 21.85156 c 0.30079,0.83594 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -21.85156 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203528"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#28c256b738-1)"
					id="g5770-5"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 439.04687,409.03516 h 6.91016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.01172,1.4375 h -6.31641 l -77.41406,-77.51953 -0.21094,-0.21094 h -9.21875 l -41.91406,41.96875 c -0.28125,-0.13672 -0.58594,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96484,2.15625 2.15625,2.15625 1.1875,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22266,-0.92187 l 41.48828,-41.54297 h 8.03125 l 77.41407,77.51953 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203525"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#c0fb14b776-0)"
					id="g5774-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 413.46875,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.9375,0 -1.71484,0.60547 -2.01172,1.4414 h -93.16406 l -34.4961,34.54688 h -32.19531 c -0.29687,-0.83594 -1.07422,-1.44141 -2.01172,-1.44141 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.9375,0 1.71485,-0.60546 2.01172,-1.4414 h 32.78906 l 34.4961,-34.54688 h 92.57031 c 0.29688,0.83594 1.07422,1.44141 2.01172,1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203522"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 442.72505,248.805 67.12264,-48.32979 0.1829,-0.13151 h 13.4699 c 0.2608,-0.52117 0.93481,-0.89865 1.74429,-0.89865 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -0.80948,0 -1.48349,-0.37748 -1.74429,-0.89865 H 510.5454 l -67.12264,48.32979 -0.18289,0.13151 h -7.99321 l -7.84419,-5.6476 v -10.76918 l -28.49444,-20.5155 c -0.24386,0.0828 -0.50804,0.13881 -0.79593,0.13881 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 28.67733,20.64701 0.1829,0.13394 v 10.76918 l 7.1126,5.12157 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203519"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.85281,220.98341 c 0.81287,0 1.48687,0.37748 1.74428,0.89865 h 65.30723 l 7.11261,-5.12158 v -5.01441 l -13.54104,-9.74632 c -0.24386,0.0828 -0.50805,0.13881 -0.79594,0.13881 -1.02963,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83996,-1.34676 1.86959,-1.34676 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.207 -0.0745,0.39696 -0.18967,0.57231 l 13.72055,9.87783 0.1829,0.13395 v 5.75476 l -7.84419,5.64761 h -65.82205 c -0.25741,0.52117 -0.93141,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203516"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#8f1e156615-1)"
					id="g5784-3"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,315.47266 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.9375 -0.60547,-1.71484 -1.4375,-2.01563 v -6.32421 l 24.23828,-24.26954 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33204 0.0898,0.63672 0.22266,0.91797 l -24.45313,24.48438 -0.20703,0.21094 v 6.91796 c -0.83203,0.30079 -1.4375,1.07813 -1.4375,2.01563 0,1.19141 0.96485,2.16016 2.15625,2.16016 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203510"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 512.15759,216.94558 c 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25666 v -8.25587 c -0.72142,-0.18753 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52159,1.06912 -1.2464,1.25665 v 8.25831 c 0.72481,0.18509 1.2464,0.66973 1.2464,1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203507"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 480.11701,205.72829 h 5.99152 c 0.26079,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -5.4767 l -44.50457,32.04452 v 3.94285 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52498,-1.06912 1.2464,-1.25665 v -4.31303 l 45.05326,-32.44148 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203504"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 443.42276,292.01079 0.18289,0.13151 v 5.75719 l -15.13968,10.90069 -0.18289,0.13151 h -28.4267 c -0.26079,0.51874 -0.9348,0.89622 -1.74428,0.89622 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74523 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48349,0.37748 1.74428,0.89621 h 27.91189 l 14.59099,-10.50615 v -5.01198 l -37.21246,-26.79144 -0.17951,-0.13151 v -4.31546 c -0.72481,-0.18509 -1.2464,-0.66973 -1.2464,-1.25421 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25421 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203501"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 524.62158,259.8372 22.61807,-16.28528 0.18628,-0.13151 h 37.90678 l 7.84419,5.64761 v 27.29312 l -21.38184,15.39637 c 0.11515,0.17291 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83996,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34676 1.8696,-1.34676 0.2845,0 0.54869,0.0535 0.79255,0.13882 L 591.9305,275.99097 V 249.4382 l -7.11261,-5.12158 h -36.87714 l -22.07278,15.89075 v 5.01198 l 6.05926,4.36418 c 0.24386,-0.0828 0.50805,-0.13882 0.79594,-0.13882 1.03302,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83658,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.20702 0.0779,-0.39697 0.19306,-0.57232 l -6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203498"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 540.20156,218.29233 c -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55208,0.056 0.79594,0.13882 l 6.42843,-4.62476 h 5.99152 c 0.25741,-0.52117 0.93142,-0.89865 1.7409,-0.89865 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -0.80948,0 -1.48349,-0.37748 -1.7409,-0.89865 h -5.4767 l -6.05926,4.36417 c 0.11515,0.17535 0.18967,0.36531 0.18967,0.57232 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203495"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.63371,237.13718 c 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 6.42506,4.62719 v 4.31303 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.58449 0.52159,-1.06912 1.2464,-1.25665 v -3.94285 l -6.05926,-4.36174 c -0.24386,0.0828 -0.50804,0.13882 -0.79593,0.13882 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203492"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.85281,231.75259 c 0.81287,0 1.48687,0.37748 1.74428,0.89864 h 48.86358 c 0.2574,-0.52116 0.93141,-0.89864 1.74089,-0.89864 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.80948,0 -1.48349,-0.37749 -1.74428,-0.89865 h -48.86019 c -0.25741,0.52116 -0.93141,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203489"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 428.02567,277.52037 c -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 0.28789,0 0.55207,0.056 0.79593,0.13881 l 43.63412,-31.41619 0.1829,-0.13151 h 20.9483 c 0.2608,-0.52117 0.93142,-0.89864 1.74428,-0.89864 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.80947,0 -1.48348,-0.37749 -1.74428,-0.89866 h -20.43348 l -43.45123,31.28712 c 0.11516,0.17535 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203486"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 569.49193,272.04567 c -0.72142,-0.18508 -1.24301,-0.66972 -1.24301,-1.2542 0,-0.74523 0.83658,-1.34676 1.8696,-1.34676 1.02964,0 1.8696,0.60153 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.24979,1.2542 v 15.08465 l -30.09647,21.66986 -0.18289,0.13151 H 517.50898 L 502.3693,298.031 l -0.1829,-0.13151 v -21.90852 l 7.84419,-5.64761 h 7.99321 l 6.42504,4.62475 c 0.24386,-0.0828 0.50805,-0.13881 0.79594,-0.13881 1.03302,0 1.86959,0.60153 1.86959,1.34675 0,0.74279 -0.83657,1.34432 -1.86959,1.34432 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.20701 0.0779,-0.39696 0.19306,-0.57231 l -6.05926,-4.36417 h -6.96358 l -7.1126,5.12157 v 21.16575 l 14.591,10.50615 h 21.92036 l 29.54777,-21.27533 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203483"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.63371,199.44505 c 0.80947,0 1.48348,0.37748 1.74089,0.89865 h 50.86527 l 13.90344,10.00935 c 0.24386,-0.0828 0.50804,-0.13882 0.79593,-0.13882 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0779,-0.39697 0.19306,-0.57232 l -13.53765,-9.74876 h -50.34706 c -0.2608,0.52117 -0.93481,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203480"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 542.07116,303.099 c 0,0.74278 -0.83658,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.58449 0.52498,-1.06913 1.2464,-1.25665 v -13.64291 c -0.72142,-0.18508 -1.2464,-0.66972 -1.2464,-1.25421 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 1.03302,0 1.8696,0.60153 1.8696,1.34675 0,0.58449 -0.52159,1.06913 -1.2464,1.25421 v 13.64291 c 0.72481,0.18509 1.2464,0.67216 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203477"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.63371,204.82964 c 0.80947,0 1.48348,0.37748 1.74089,0.89865 h 20.9517 l 7.84418,5.64761 v 9.69761 c 0.72142,0.18753 1.24639,0.67217 1.24639,1.25666 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52159,-1.06913 1.2464,-1.25666 v -9.32744 l -7.1126,-5.12157 h -20.43349 c -0.2608,0.52117 -0.93481,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203474"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.63371,210.21423 c 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.58448 -0.52498,1.06912 -1.24639,1.25664 v 20.09662 l 7.1126,5.11914 h 5.4767 c 0.25741,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -0.81287,0 -1.48687,-0.37749 -1.74428,-0.89866 h -5.99152 l -7.84418,-5.6476 v -20.4668 c -0.72481,-0.18752 -1.2464,-0.67216 -1.2464,-1.25664 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203471"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f1bcfcfd5a-5)"
					id="g5814-44"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,367.28906 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22265,-0.92187 l 50.32812,-50.39063 0.20703,-0.21094 v -6.92187 c 0.83594,-0.29688 1.4375,-1.07422 1.4375,-2.01172 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 6.32812 l -50.11328,50.17969 c -0.28125,-0.13672 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203468"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#beeac1b475-7)"
					id="g5818-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,384.5625 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 13.22656 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -13.22656 c -0.30078,-0.83203 -1.07812,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203465"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 524.45223,215.73764 c 0.24047,-0.0828 0.50466,-0.13882 0.79255,-0.13882 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0779,-0.39697 0.19306,-0.57232 l -6.42506,-4.62719 v -4.31302 c -0.72142,-0.18753 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52159,1.06912 -1.2464,1.25665 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203462"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#5946722d62-1)"
					id="g5824-5"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 232.33984,224.78516 c -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 h 67.28906 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.1875,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96875,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0859,0.63672 0.21875,0.91797 l -6.98828,7 h -66.69141 c -0.29687,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203459"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#f773d7ee6f-1)"
					id="g5828-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 312.125,408.31641 c 0,-1.19532 -0.96875,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71484,0.60547 -2.01172,1.4375 h -82.23047 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 82.23047 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.1875,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203456"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 444.85205,276.17605 c 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.58449 0.52498,-1.06912 1.2464,-1.25664 v -4.31303 l 30.09646,-21.66987 0.1829,-0.13151 h 44.87036 l 13.53765,-9.74876 c -0.11516,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.28789,0 -0.55208,-0.056 -0.79594,-0.13882 l -13.71716,9.87783 -0.18627,0.13151 h -44.87036 l -29.54779,21.27534 v 3.94286 c 0.72142,0.18752 1.2464,0.67215 1.2464,1.25664 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203453"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 622.46727,269.44471 c 0.81287,0 1.48348,0.37748 1.74428,0.89865 h 11.46822 c 0.25741,-0.52117 0.93142,-0.89865 1.74429,-0.89865 1.03301,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83659,1.34432 -1.8696,1.34432 -0.81287,0 -1.48349,-0.37505 -1.74429,-0.89622 h -11.46822 c -0.2608,0.52117 -0.9348,0.89622 -1.74428,0.89622 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74523 0.83658,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203450"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 480.37442,237.13718 c 0.81287,0 1.48687,0.37748 1.74428,0.89621 h 20.94831 l 7.47839,5.38702 h 6.96358 l 6.05926,-4.36417 c -0.11517,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 1.03302,0 1.86959,0.60397 1.86959,1.34675 0,0.74279 -0.83657,1.34676 -1.86959,1.34676 -0.28789,0 -0.55208,-0.056 -0.79255,-0.13882 l -6.42843,4.62475 h -7.99321 l -7.4784,-5.38459 H 482.1187 c -0.25741,0.52117 -0.93141,0.89866 -1.74428,0.89866 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34676 0,-0.74278 0.83657,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203447"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 525.86797,286.75771 v 15.08464 c 0.72481,0.18509 1.2464,0.67216 1.2464,1.25665 0,0.74278 -0.83657,1.34432 -1.86959,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.58449 0.52498,-1.07156 1.2464,-1.25665 v -14.71203 l -13.53766,-9.74633 c -0.24386,0.0828 -0.50804,0.13638 -0.79593,0.13638 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 1.03302,0 1.8696,0.60153 1.8696,1.34675 0,0.20701 -0.0745,0.39696 -0.18967,0.57231 l 13.72055,9.87784 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203444"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.85281,274.8293 c 0.28789,0 0.55208,0.056 0.79594,0.13881 l 13.53765,-9.74876 v -3.94285 c -0.72142,-0.18509 -1.2464,-0.66973 -1.2464,-1.25421 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25421 v 4.31546 l -13.90345,10.01178 c 0.11854,0.17535 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203441"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 449.83765,270.60638 22.61807,-16.28772 0.1829,-0.12907 h 35.90509 c 0.26079,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.80948,0 -1.48349,-0.37749 -1.74428,-0.89866 h -35.39027 l -22.06939,15.89075 v 5.01442 l 6.05926,4.36173 c 0.24386,-0.0828 0.50804,-0.13881 0.79593,-0.13881 1.03302,0 1.8696,0.60153 1.8696,1.34675 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.20701 0.0745,-0.39697 0.19306,-0.57231 l -6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203438"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 435.50406,258.67553 c 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13881 l -6.42505,4.62475 h -5.99152 c -0.2608,0.52117 -0.9348,0.89865 -1.74428,0.89865 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74523 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48348,0.37748 1.74428,0.89621 h 5.47671 l 6.05925,-4.36173 c -0.11854,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203435"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 639.29366,260.02229 c 0,0.74278 -0.83659,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25665 v -4.31303 l 13.90344,-10.01178 c -0.11516,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -13.53765,9.74632 v 3.94286 c 0.72142,0.18752 1.2464,0.67216 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203432"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f78a6aa82b-1)"
					id="g5848-8"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 195.68359,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71875 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203429"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 412.27295,274.96811 c 0.24386,-0.0828 0.50804,-0.13881 0.79593,-0.13881 1.03303,0 1.8696,0.60153 1.8696,1.34675 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.20701 0.0745,-0.39696 0.18967,-0.57231 l -13.72055,-9.88027 -0.17951,-0.13151 v -4.31546 c -0.72481,-0.18509 -1.2464,-0.66973 -1.2464,-1.25421 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25421 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203426"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 465.41763,207.52315 c -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83657,-1.34676 1.86959,-1.34676 0.81287,0 1.48349,0.37748 1.74429,0.89865 h 5.4767 l 7.47839,-5.38459 h 20.94831 c 0.26079,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -0.80948,0 -1.48349,-0.37748 -1.74428,-0.89865 h -20.43349 l -7.47839,5.38459 h -5.99152 c -0.25742,0.52117 -0.93142,0.89865 -1.74429,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203423"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 593.1769,293.58403 v 4.31546 l -6.42505,4.6272 c 0.11515,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74278 -0.83997,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74522 0.83657,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.0561 0.79593,0.13882 l 6.05926,-4.36417 v -3.94286 c -0.72481,-0.18509 -1.2464,-0.66972 -1.2464,-1.25421 0,-0.74522 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60154 1.8696,1.34676 0,0.58449 -0.52498,1.06912 -1.2464,1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203420"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 457.31604,270.60638 13.90345,-10.01178 c -0.11517,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 -0.28789,0 -0.55208,-0.056 -0.79594,-0.13881 l -13.53765,9.74632 v 5.01442 l 6.05926,4.36173 c 0.24386,-0.0828 0.50804,-0.13881 0.79593,-0.13881 1.03303,0 1.8696,0.60153 1.8696,1.34675 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.20701 0.0779,-0.39697 0.19305,-0.57231 l -6.42505,-4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203417"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 442.98245,210.21423 c 0.80948,0 1.48349,0.37748 1.74429,0.89865 h 5.99152 l 6.42505,4.62476 c 0.24386,-0.0828 0.50804,-0.13882 0.79593,-0.13882 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.20701 0.0745,-0.39697 0.19306,-0.57232 l -6.05926,-4.36417 h -5.4767 c -0.25742,0.52117 -0.93142,0.89865 -1.74429,0.89865 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83657,-1.34676 1.86959,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203414"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 532.28287,265.72347 -0.1829,-0.13151 v -5.75476 l 6.42505,-4.62719 c -0.11516,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79254,-0.13882 l -6.06265,4.36173 v 5.01198 l 14.77728,10.63767 0.18289,0.13395 v 4.31302 c 0.72142,0.18753 1.24301,0.67216 1.24301,1.25665 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.02963,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.58449 0.52497,-1.07156 1.24978,-1.25665 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203411"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 467.28723,270.79147 c 0,0.74278 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.86959,-0.60154 -1.86959,-1.34432 0,-0.74523 0.83657,-1.34676 1.86959,-1.34676 0.28789,0 0.55208,0.056 0.79594,0.13882 l 13.72055,-9.88028 0.18289,-0.13151 h 13.46991 c 0.2608,-0.51873 0.93481,-0.89621 1.74428,-0.89621 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -0.80947,0 -1.48348,-0.37748 -1.74428,-0.89865 h -12.95509 l -13.53766,9.74876 c 0.11855,0.17535 0.19306,0.3653 0.19306,0.57232 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203408"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#23ff1b1a5d-0)"
					id="g5866-8"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 422.09375,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0898,0.63672 0.22266,0.91797 l -6.98829,7 h -6.3164 c -0.29688,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96484,2.16016 2.15625,2.16016 0.9375,0 1.71484,-0.60547 2.01172,-1.44141 h 6.91015 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203405"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#16634a2329-8)"
					id="g5870-4"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,350.01562 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.63671 -0.22265,-0.91796 l 15.61328,-15.63672 h 6.3164 c 0.29688,0.83593 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -6.91015 l -16.03516,16.05859 c -0.28125,-0.13281 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203402"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 509.66479,288.19944 c -0.72142,-0.18508 -1.2464,-0.66972 -1.2464,-1.25421 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 1.03302,0 1.8696,0.60153 1.8696,1.34675 0,0.58449 -0.52159,1.06913 -1.2464,1.25421 v 9.32745 l 6.06265,4.36417 c 0.24047,-0.0852 0.50465,-0.13882 0.79254,-0.13882 1.03303,0 1.8696,0.60154 1.8696,1.34676 0,0.74278 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.20701 0.0779,-0.3994 0.19306,-0.57231 l -6.42505,-4.6272 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203399"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#bc99b6b289-1)"
					id="g5876-3"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 187.05859,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71485 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203396"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 426.28139,248.805 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.81287,0 -1.48687,-0.37749 -1.74428,-0.89866 h -5.99152 l -6.42844,-4.62475 c -0.24047,0.0828 -0.50466,0.13882 -0.79255,0.13882 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.74278 0.83657,-1.34675 1.86959,-1.34675 1.03303,0 1.8696,0.60397 1.8696,1.34675 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 6.05927,4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203393"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 413.06888,285.59848 c 0.80948,0 1.48349,0.37747 1.74429,0.89621 h 13.46991 l 7.84418,5.64761 v 5.75719 l -7.84418,5.64761 h -28.4267 c -0.26079,0.52117 -0.9348,0.89622 -1.74428,0.89622 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74522 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48349,0.37748 1.74428,0.89865 h 27.91189 l 7.11259,-5.124 v -5.01198 l -7.11259,-5.12157 h -12.9551 c -0.2608,0.52117 -0.93481,0.89621 -1.74429,0.89621 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.74522 0.83657,-1.34675 1.86959,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203390"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 396.2425,270.79147 c 0,-0.74523 0.83657,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60153 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.2542 v 13.64291 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.58449 0.52159,-1.06912 1.2464,-1.25665 v -13.64291 c -0.72481,-0.18508 -1.2464,-0.66972 -1.2464,-1.2542 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203387"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 457.93924,231.75259 c 1.03302,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83658,1.34676 -1.8696,1.34676 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13882 l -12.48432,8.98893 c 0.11517,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74279 -0.83657,1.34676 -1.8696,1.34676 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.74278 0.83657,-1.34675 1.86959,-1.34675 0.28789,0 0.55208,0.056 0.79594,0.13881 l 12.48431,-8.98893 c -0.11854,-0.17535 -0.19306,-0.3653 -0.19306,-0.57231 0,-0.74278 0.83658,-1.34675 1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203384"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#cf57b94926-6)"
					id="g5888-5"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 378.96875,410.47266 c 0.93359,0 1.71094,-0.60547 2.01172,-1.4375 h 47.72656 c 0.30078,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71094,0.60547 -2.01172,1.4375 h -47.72656 c -0.30078,-0.83203 -1.07813,-1.4375 -2.01172,-1.4375 -1.19141,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96484,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203381"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 405.59049,299.05873 c -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34676 1.8696,-1.34676 0.28789,0 0.55208,0.0535 0.79255,0.13882 l 6.42844,-4.6272 h 13.46991 c 0.25741,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.03302,0 1.8696,0.60154 1.8696,1.34676 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89621 H 413.3263 l -6.05927,4.36173 c 0.11516,0.17535 0.19306,0.36774 0.19306,0.57475 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203375"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#024131cb33-6)"
					id="g5898-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,0.62345308,823.91986,59.302054)"
				>
					<path
						fill="#3a7cc3"
						d="m 268.85156,219.02734 h 30.48047 c 0.29688,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.00781,1.4414 h -30.48047 c -0.29687,-0.83593 -1.07422,-1.4414 -2.01172,-1.4414 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203372"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 622.46727,277.52037 c -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 0.80948,0 1.48348,0.37748 1.74428,0.89864 h 20.9483 l 13.90345,10.00935 c 0.24386,-0.0828 0.50805,-0.13881 0.79594,-0.13881 1.03301,0 1.86959,0.60153 1.86959,1.34675 0,0.74279 -0.83658,1.34432 -1.86959,1.34432 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.20701 0.0779,-0.39697 0.19305,-0.57231 l -13.53765,-9.74876 h -20.43349 c -0.2608,0.52117 -0.9348,0.89621 -1.74428,0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203369"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 594.29459,211.11288 h 11.47161 c 0.25741,-0.52117 0.93142,-0.89865 1.74429,-0.89865 1.03301,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83658,1.34675 -1.86959,1.34675 -0.81287,0 -1.48688,-0.37748 -1.74429,-0.89865 h -11.46822 c -0.2608,0.52117 -0.9348,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.80948,0 1.48348,0.37748 1.74089,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203366"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 429.89527,222.33017 c 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52498,-1.06913 1.2464,-1.25666 v -13.64046 c -0.72142,-0.18753 -1.2464,-0.67217 -1.2464,-1.25665 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25665 v 13.64046 c 0.72142,0.18753 1.2464,0.67217 1.2464,1.25666 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203363"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 643.15817,238.93203 h -11.46822 c -0.26081,0.52117 -0.93481,0.89866 -1.74429,0.89866 -1.03302,0 -1.86959,-0.60397 -1.86959,-1.34676 0,-0.74278 0.83657,-1.34675 1.86959,-1.34675 0.80948,0 1.48348,0.37748 1.74429,0.89621 h 11.46822 c 0.2574,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.03301,0 1.8696,0.60397 1.8696,1.34675 0,0.74279 -0.83659,1.34676 -1.8696,1.34676 -0.81287,0 -1.48688,-0.37749 -1.74428,-0.89866 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203360"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 568.24892,249.25311 c 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.02964,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.24979,1.25421 v 9.70005 l -6.42166,4.6272 c 0.11515,0.17534 0.19306,0.3653 0.19306,0.57231 0,0.74278 -0.83997,1.34675 -1.8696,1.34675 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74523 0.83658,-1.34676 1.8696,-1.34676 0.2845,0 0.54868,0.056 0.79254,0.13882 l 6.05926,-4.36174 v -9.32988 c -0.72142,-0.18509 -1.24301,-0.66973 -1.24301,-1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203357"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="M 554.90432,271.23957 540.9975,261.23023 c -0.24386,0.0828 -0.50805,0.13881 -0.79594,0.13881 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.207 -0.0745,0.39696 -0.18967,0.57231 l 13.53765,9.74876 h 5.47671 c 0.2574,-0.52117 0.93141,-0.89865 1.74428,-0.89865 1.02963,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83997,1.34432 -1.8696,1.34432 -0.81287,0 -1.48688,-0.37505 -1.74428,-0.89622 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203354"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 397.4889,296.45776 v -4.31546 l 15.13629,-10.90069 0.18629,-0.12908 h 5.99151 c 0.25742,-0.52116 0.93142,-0.89864 1.74429,-0.89864 1.03302,0 1.86959,0.60153 1.86959,1.34675 0,0.74279 -0.83657,1.34432 -1.86959,1.34432 -0.81287,0 -1.48687,-0.37504 -1.74429,-0.89621 h -5.47669 l -14.591,10.50616 v 3.94285 c 0.72142,0.18753 1.2464,0.67216 1.2464,1.25665 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.58449 0.52159,-1.07156 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203351"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 594.4233,286.94523 c 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -0.81287,0 -1.48688,-0.37504 -1.74428,-0.89621 h -5.47671 l -13.53765,9.74632 c 0.11515,0.17535 0.19306,0.36774 0.19306,0.57475 0,0.74279 -0.83996,1.34432 -1.8696,1.34432 -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34676 1.8696,-1.34676 0.2845,0 0.54869,0.0535 0.79255,0.13882 l 13.72393,-9.88027 0.18289,-0.13151 h 5.99153 c 0.2574,-0.51874 0.93141,-0.89621 1.74428,-0.89621 1.03302,0 1.8696,0.60153 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203348"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 435.50406,282.90496 c -1.03302,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60153 1.8696,1.34675 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 12.48431,8.98893 c 0.24386,-0.0852 0.50805,-0.13882 0.79594,-0.13882 1.03302,0 1.8696,0.60154 1.8696,1.34676 0,0.74279 -0.83658,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60153 -1.8696,-1.34432 0,-0.20701 0.0745,-0.3994 0.19306,-0.57231 L 436.3,282.76858 c -0.24386,0.0828 -0.50805,0.13638 -0.79594,0.13638 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203345"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 643.15817,286.49469 c 0.2574,-0.51874 0.93141,-0.89621 1.74428,-0.89621 1.03301,0 1.8696,0.60153 1.8696,1.34675 0,0.74279 -0.83659,1.34432 -1.8696,1.34432 -0.81287,0 -1.48688,-0.37504 -1.74428,-0.89621 h -5.99153 l -6.42504,-4.62476 c -0.24386,0.0828 -0.50805,0.13638 -0.79594,0.13638 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.74522 0.83657,-1.34675 1.86959,-1.34675 1.03302,0 1.8696,0.60153 1.8696,1.34675 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 6.05926,4.36174 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203342"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 472.89603,218.29233 c -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.28789,0 0.55207,0.056 0.79593,0.13882 l 6.42505,-4.62476 h 5.99152 c 0.26079,-0.52117 0.9348,-0.89865 1.74428,-0.89865 1.03303,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -5.4767 l -6.05927,4.36417 c 0.11855,0.17535 0.19306,0.36531 0.19306,0.57232 0,0.74278 -0.83657,1.34675 -1.86959,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203339"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 571.85941,265.85498 c -0.25741,0.52117 -0.93141,0.89865 -1.74089,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74523 0.83658,-1.34676 1.8696,-1.34676 0.80948,0 1.48348,0.37748 1.74089,0.89621 h 5.99153 l 6.42843,4.6272 c 0.24386,-0.0828 0.50805,-0.13882 0.79594,-0.13882 1.02963,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83997,1.34432 -1.8696,1.34432 -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.20702 0.0745,-0.39697 0.18967,-0.57232 l -6.05926,-4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203333"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 585.07531,207.52315 c -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 0.80948,0 1.48348,0.37748 1.74089,0.89865 h 18.95 c 0.25741,-0.52117 0.93142,-0.89865 1.74429,-0.89865 1.03301,0 1.86959,0.60397 1.86959,1.34676 0,0.74278 -0.83658,1.34675 -1.86959,1.34675 -0.81287,0 -1.48688,-0.37748 -1.74429,-0.89865 h -18.95 c -0.25741,0.52117 -0.93141,0.89865 -1.74089,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203330"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 472.89603,272.13579 c -1.03303,0 -1.8696,-0.60154 -1.8696,-1.34432 0,-0.74523 0.83657,-1.34676 1.8696,-1.34676 0.81286,0 1.48687,0.37748 1.74428,0.89865 h 12.9551 l 6.05926,-4.36417 c -0.11517,-0.17535 -0.19306,-0.36531 -0.19306,-0.57231 0,-0.74523 0.83657,-1.34676 1.86959,-1.34676 1.03303,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83657,1.34675 -1.8696,1.34675 -0.28789,0 -0.55207,-0.056 -0.79593,-0.13881 l -6.42505,4.62475 h -13.46991 c -0.2608,0.52117 -0.93142,0.89622 -1.74428,0.89622 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203327"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 643.15817,308.03304 c 0.2574,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.03301,0 1.8696,0.60153 1.8696,1.34676 0,0.74278 -0.83659,1.34432 -1.8696,1.34432 -0.81287,0 -1.48688,-0.37748 -1.74428,-0.89622 h -5.99153 l -6.42504,-4.62719 c -0.24386,0.0852 -0.50805,0.13882 -0.79594,0.13882 -1.03302,0 -1.86959,-0.60154 -1.86959,-1.34432 0,-0.74522 0.83657,-1.34676 1.86959,-1.34676 1.03302,0 1.8696,0.60154 1.8696,1.34676 0,0.207 -0.0779,0.39696 -0.19306,0.57231 l 6.05926,4.36173 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203324"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 494.53866,296.50647 c 0.24047,-0.0852 0.50465,-0.13882 0.79254,-0.13882 1.03303,0 1.8696,0.60154 1.8696,1.34676 0,0.74279 -0.83657,1.34432 -1.8696,1.34432 -1.03302,0 -1.86959,-0.60153 -1.86959,-1.34432 0,-0.20701 0.0779,-0.3994 0.19306,-0.57475 l -6.42506,-4.62475 v -4.31547 c -0.72142,-0.18508 -1.2464,-0.66972 -1.2464,-1.25421 0,-0.74522 0.83658,-1.34675 1.8696,-1.34675 1.03303,0 1.8696,0.60153 1.8696,1.34675 0,0.58449 -0.52498,1.06913 -1.2464,1.25421 v 3.94286 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203321"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 450.46085,215.59882 c 1.03302,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83658,1.34675 -1.8696,1.34675 -0.81287,0 -1.48687,-0.37748 -1.74428,-0.89865 h -11.46823 c -0.26079,0.52117 -0.9348,0.89865 -1.74428,0.89865 -1.03302,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.74279 0.83658,-1.34676 1.8696,-1.34676 0.81287,0 1.48349,0.37748 1.74428,0.89865 h 11.46823 c 0.25741,-0.52117 0.93141,-0.89865 1.74428,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203318"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 586.94491,265.40688 c 0,0.74278 -0.83997,1.34675 -1.8696,1.34675 -1.03303,0 -1.8696,-0.60397 -1.8696,-1.34675 0,-0.58449 0.52159,-1.06913 1.2464,-1.25665 v -13.64291 c -0.72481,-0.18509 -1.2464,-0.66973 -1.2464,-1.25421 0,-0.74279 0.83657,-1.34676 1.8696,-1.34676 1.02963,0 1.8696,0.60397 1.8696,1.34676 0,0.58448 -0.52498,1.06912 -1.2464,1.25421 v 13.64291 c 0.72142,0.18752 1.2464,0.67216 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203315"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 560.89585,260.47039 h -11.47161 c -0.25742,0.52117 -0.93142,0.89865 -1.74429,0.89865 -1.02963,0 -1.86959,-0.60397 -1.86959,-1.34675 0,-0.74279 0.83996,-1.34676 1.86959,-1.34676 0.81287,0 1.48687,0.37748 1.74429,0.89621 h 11.47161 c 0.2574,-0.51873 0.93141,-0.89621 1.74428,-0.89621 1.02963,0 1.8696,0.60397 1.8696,1.34676 0,0.74278 -0.83997,1.34675 -1.8696,1.34675 -0.81287,0 -1.48688,-0.37748 -1.74428,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203309"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#c3dfdef643-28)"
					id="g5726-8"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 206.46484,410.47266 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 6.91016 l 43.33984,-43.39454 0.20703,-0.21093 v -61.05078 l -50.53515,-50.60547 c 0.13281,-0.28125 0.22265,-0.58594 0.22265,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 50.11328,50.17969 v 59.85937 l -42.70312,42.76172 h -6.31641 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203306"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 389.77377,320.10271 v 47.38974 l 7.84418,5.6476 h 44.87036 l 21.01604,15.13335 c -0.11516,0.17535 -0.19305,0.36531 -0.19305,0.57232 0,0.74278 0.83657,1.34675 1.86959,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -21.19894,-15.26243 -0.18289,-0.13151 h -44.87036 l -7.1126,-5.12157 v -47.01956 c 0.72141,-0.18753 1.24639,-0.67217 1.24639,-1.25665 0,-0.74279 -0.83657,-1.34432 -1.86959,-1.34432 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.58448 0.52159,1.07156 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203300"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#a9f825f88d-0)"
					id="g5736-5"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 501.875,408.31641 c 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.00781,1.4375 h -40.82032 l -58.73828,-58.81641 c 0.13282,-0.28125 0.22266,-0.58593 0.22266,-0.91797 0,-1.19531 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96484,2.15625 2.15625,2.15625 0.33203,0 0.63672,-0.0859 0.91797,-0.21875 l 58.94922,59.02735 0.21093,0.21094 h 41.41016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203297"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 487.35867,400.063 h 67.30891 l 13.53427,9.74876 c -0.11516,0.17534 -0.18967,0.3653 -0.18967,0.57231 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.02964,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83996,-1.34675 -1.8696,-1.34675 -0.28789,0 -0.55207,0.056 -0.79593,0.13881 l -13.72055,-9.87784 -0.1829,-0.13151 h -67.30892 l -58.40801,-42.05629 c 0.11516,-0.17535 0.19306,-0.3653 0.19306,-0.57231 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 58.59091,42.18537 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203294"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 502.31545,323.78254 h -20.43349 c -0.25741,-0.52117 -0.93141,-0.89621 -1.74428,-0.89621 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.74522 0.83657,1.34675 1.8696,1.34675 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 20.94831 l 14.95679,-10.76674 h 29.40213 l 7.47839,5.38459 h 65.81867 c 0.2574,0.51873 0.93141,0.89621 1.74428,0.89621 1.03302,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48688,0.37748 -1.74428,0.89621 H 555.1824 l -7.47839,-5.38459 h -30.43177 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203291"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 388.52737,383.46113 c 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.58449 -0.52498,-1.06913 -1.24639,-1.25422 v -8.25831 c 0.72141,-0.18753 1.24639,-0.67217 1.24639,-1.25665 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58448 0.52159,1.06912 1.2464,1.25665 v 8.25831 c -0.72481,0.18509 -1.2464,0.66973 -1.2464,1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203288"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#e371159ec0-3)"
					id="g5746-06"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,375.92578 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 32.78516 l 26.08984,-26.12109 0.20703,-0.21094 v -17.87109 l -7.40625,-7.41797 c 0.13282,-0.28125 0.21875,-0.58594 0.21875,-0.91797 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.33203,0 0.63672,-0.0898 0.91797,-0.22265 l 6.98828,6.99609 v 16.67969 l -25.45312,25.48437 h -32.19141 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203285"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 607.53115,330.06578 6.42505,-4.62719 c 0.24386,0.0852 0.50805,0.13881 0.79594,0.13881 1.03301,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83659,-1.34432 -1.8696,-1.34432 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.207 0.0745,0.39696 0.18967,0.57231 l -6.05588,4.36417 h -6.96357 l -6.05926,-4.36417 c 0.11515,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83658,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60153 -1.8696,1.34432 0,0.74522 0.83658,1.34675 1.8696,1.34675 0.28789,0 0.55207,-0.0536 0.79594,-0.13881 l 6.42504,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203279"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#01b6702168-7)"
					id="g5756-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 499.71875,216.14844 c -0.93359,0 -1.71094,0.60547 -2.01172,1.4414 h -58.66016 l -24.66406,24.69141 c -0.27734,-0.13281 -0.58203,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96875 -2.15625,2.16016 0,1.19141 0.96484,2.16016 2.15625,2.16016 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.33203 -0.0898,-0.63672 -0.22266,-0.91797 l 24.23828,-24.27344 h 58.07032 c 0.29687,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203276"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 616.62174,367.30736 c 0,-0.74278 -0.83659,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58448 0.52159,1.06913 1.2464,1.25665 v 9.69761 l 7.84418,5.64761 h 7.99321 l 6.42505,-4.62475 c 0.24386,0.0828 0.50805,0.13881 0.79594,0.13881 1.03301,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83659,-1.34676 -1.8696,-1.34676 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.207 0.0745,0.39696 0.19305,0.57231 l -6.05926,4.36417 h -6.96357 l -7.1126,-5.12157 v -9.32744 c 0.72142,-0.18752 1.2464,-0.67217 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203273"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#1fe81e7f15-5)"
					id="g5762-8"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 361.71875,324.10937 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.33203,0 -0.63672,0.0899 -0.91797,0.22266 l -41.69922,-41.75781 -0.21484,-0.20704 h -51.75 l -42.70313,-42.76171 v -8.04297 l 8.20313,-8.21485 h 6.3164 c 0.30079,0.83594 1.07813,1.44141 2.01172,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.01172,1.4414 h -6.91015 l -9.04688,9.0586 v 9.23047 l 43.33594,43.39453 0.21094,0.21093 h 51.75 l 41.48828,41.54688 c -0.13281,0.28125 -0.21875,0.58594 -0.21875,0.91797 0,1.1914 0.96484,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203270"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#ef8cb358c1-4)"
					id="g5766-77"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,324.10937 c 0.9375,0 1.71094,-0.60546 2.01172,-1.4414 h 21.85156 c 0.30079,0.83594 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -21.85156 c -0.30078,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203267"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#28c256b738-3)"
					id="g5770-12"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 439.04687,409.03516 h 6.91016 c 0.30078,0.83203 1.07813,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71094,0.60547 -2.01172,1.4375 h -6.31641 l -77.41406,-77.51953 -0.21094,-0.21094 h -9.21875 l -41.91406,41.96875 c -0.28125,-0.13672 -0.58594,-0.22266 -0.91406,-0.22266 -1.19141,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96484,2.15625 2.15625,2.15625 1.1875,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22266,-0.92187 l 41.48828,-41.54297 h 8.03125 l 77.41407,77.51953 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203264"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#c0fb14b776-6)"
					id="g5774-15"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 413.46875,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.9375,0 -1.71484,0.60547 -2.01172,1.4414 h -93.16406 l -34.4961,34.54688 h -32.19531 c -0.29687,-0.83594 -1.07422,-1.44141 -2.01172,-1.44141 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,1.1914 0.96485,2.16015 2.15625,2.16015 0.9375,0 1.71485,-0.60546 2.01172,-1.4414 h 32.78906 l 34.4961,-34.54688 h 92.57031 c 0.29688,0.83594 1.07422,1.44141 2.01172,1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203261"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 442.48831,378.52464 67.12264,48.32979 0.1829,0.13151 h 13.4699 c 0.2608,0.52117 0.93481,0.89865 1.74429,0.89865 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -0.80948,0 -1.48349,0.37748 -1.74429,0.89865 h -12.95509 l -67.12264,-48.32979 -0.18289,-0.13151 h -7.99321 l -7.84419,5.64761 v 10.76917 l -28.49444,20.51551 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57231 l 28.67733,-20.64702 0.1829,-0.13394 v -10.76918 l 7.1126,-5.12157 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203258"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.61607,406.34624 c 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 65.30723 l 7.11261,5.12157 v 5.01441 l -13.54104,9.74633 c -0.24386,-0.0828 -0.50805,-0.13882 -0.79594,-0.13882 -1.02963,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83996,1.34675 1.86959,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.20701 -0.0745,-0.39697 -0.18967,-0.57231 l 13.72055,-9.87784 0.1829,-0.13394 v -5.75477 l -7.84419,-5.64761 h -65.82205 c -0.25741,-0.52116 -0.93141,-0.89864 -1.74428,-0.89864 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203255"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#8f1e156615-8)"
					id="g5784-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,315.47266 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-0.9375 -0.60547,-1.71484 -1.4375,-2.01563 v -6.32421 l 24.23828,-24.26954 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33204 0.0898,0.63672 0.22266,0.91797 l -24.45313,24.48438 -0.20703,0.21094 v 6.91796 c -0.83203,0.30079 -1.4375,1.07813 -1.4375,2.01563 0,1.19141 0.96485,2.16016 2.15625,2.16016 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203249"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 511.92085,410.38407 c 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25665 v 8.25588 c -0.72142,0.18753 -1.2464,0.67216 -1.2464,1.25665 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52159,-1.06912 -1.2464,-1.25665 v -8.25832 c 0.72481,-0.18508 1.2464,-0.66972 1.2464,-1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203246"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 479.88027,421.60135 h 5.99152 c 0.26079,0.52117 0.9348,0.89866 1.74428,0.89866 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48687,0.37748 -1.74428,0.89865 h -5.4767 l -44.50457,-32.04451 v -3.94286 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25664 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58448 0.52498,1.06912 1.2464,1.25664 v 4.31303 l 45.05326,32.44148 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203243"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 443.18602,335.31886 0.18289,-0.13151 v -5.7572 l -15.13968,-10.90069 -0.18289,-0.13151 h -28.4267 c -0.26079,-0.51873 -0.9348,-0.89621 -1.74428,-0.89621 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.74522 0.83657,1.34675 1.8696,1.34675 0.80948,0 1.48349,-0.37748 1.74428,-0.89621 h 27.91189 l 14.59099,10.50616 v 5.01197 l -37.21246,26.79144 -0.17951,0.13151 v 4.31546 c -0.72481,0.18509 -1.2464,0.66973 -1.2464,1.25422 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25422 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203240"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 524.38484,367.49245 22.61807,16.28527 0.18628,0.13151 h 37.90678 l 7.84419,-5.64761 V 350.9685 l -21.38184,-15.39636 c 0.11515,-0.17292 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83996,-1.34433 -1.8696,-1.34433 -1.03302,0 -1.8696,0.60154 -1.8696,1.34433 0,0.74522 0.83658,1.34675 1.8696,1.34675 0.2845,0 0.54869,-0.0536 0.79255,-0.13881 l 21.01943,15.13091 v 26.55277 l -7.11261,5.12157 h -36.87714 l -22.07278,-15.89075 v -5.01198 l 6.05926,-4.36417 c 0.24386,0.0828 0.50805,0.13882 0.79594,0.13882 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.20701 0.0779,0.39696 0.19306,0.57231 l -6.42505,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203237"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 539.96482,409.03732 c -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55208,-0.056 0.79594,-0.13882 l 6.42843,4.62476 h 5.99152 c 0.25741,0.52116 0.93142,0.89865 1.7409,0.89865 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -0.80948,0 -1.48349,0.37748 -1.7409,0.89865 h -5.4767 l -6.05926,-4.36417 c 0.11515,-0.17535 0.18967,-0.36531 0.18967,-0.57231 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203234"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.39697,390.19247 c 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57232 l 6.42506,-4.62719 v -4.31303 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25664 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.58448 0.52159,1.06912 1.2464,1.25664 v 3.94286 l -6.05926,4.36174 c -0.24386,-0.0828 -0.50804,-0.13882 -0.79593,-0.13882 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203231"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.61607,395.57706 c 0.81287,0 1.48687,-0.37748 1.74428,-0.89865 h 48.86358 c 0.2574,0.52117 0.93141,0.89865 1.74089,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48349,0.37748 -1.74428,0.89865 h -48.86019 c -0.25741,-0.52117 -0.93141,-0.89865 -1.74428,-0.89865 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83658,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203228"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 427.78893,349.80927 c -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 43.63412,31.41619 0.1829,0.13151 h 20.9483 c 0.2608,0.52117 0.93142,0.89865 1.74428,0.89865 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.80947,0 -1.48348,0.37748 -1.74428,0.89865 H 472.9167 L 429.46547,351.7259 c 0.11516,-0.17535 0.19306,-0.3653 0.19306,-0.57231 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203225"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 569.25519,355.28397 c -0.72142,0.18509 -1.24301,0.66972 -1.24301,1.25421 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.02964,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06912 -1.24979,-1.25421 v -15.08465 l -30.09647,-21.66986 -0.18289,-0.13151 h -22.94999 l -15.13968,10.90069 -0.1829,0.13151 v 21.90853 l 7.84419,5.6476 h 7.99321 l 6.42504,-4.62475 c 0.24386,0.0828 0.50805,0.13882 0.79594,0.13882 1.03302,0 1.86959,-0.60154 1.86959,-1.34676 0,-0.74278 -0.83657,-1.34432 -1.86959,-1.34432 -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.20701 0.0779,0.39696 0.19306,0.57231 l -6.05926,4.36417 h -6.96358 l -7.1126,-5.12157 v -21.16574 l 14.591,-10.50616 h 21.92036 l 29.54777,21.27534 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203222"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.39697,427.88459 c 0.80947,0 1.48348,-0.37748 1.74089,-0.89865 h 50.86527 l 13.90344,-10.00934 c 0.24386,0.0828 0.50804,0.13882 0.79593,0.13882 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.207 0.0779,0.39696 0.19306,0.57231 l -13.53765,9.74876 h -50.34706 c -0.2608,-0.52117 -0.93481,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203219"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 541.83442,324.23065 c 0,-0.74279 -0.83658,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60153 -1.8696,1.34432 0,0.58448 0.52498,1.06912 1.2464,1.25665 v 13.6429 c -0.72142,0.18509 -1.2464,0.66973 -1.2464,1.25421 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.58448 -0.52159,-1.06912 -1.2464,-1.25421 v -13.6429 c 0.72481,-0.18509 1.2464,-0.67217 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203216"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.39697,422.50001 c 0.80947,0 1.48348,-0.37749 1.74089,-0.89866 h 20.9517 l 7.84418,-5.6476 v -9.69762 c 0.72142,-0.18752 1.24639,-0.67216 1.24639,-1.25665 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52159,1.06913 1.2464,1.25665 v 9.32744 l -7.1126,5.12157 h -20.43349 c -0.2608,-0.52117 -0.93481,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83657,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203213"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 390.39697,417.11542 c 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.58449 -0.52498,-1.06912 -1.24639,-1.25665 v -20.09662 l 7.1126,-5.11914 h 5.4767 c 0.25741,0.51874 0.93141,0.89622 1.74428,0.89622 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48687,0.37748 -1.74428,0.89865 h -5.99152 l -7.84418,5.6476 v 20.4668 c -0.72481,0.18753 -1.2464,0.67216 -1.2464,1.25665 0,0.74279 0.83657,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203210"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f1bcfcfd5a-2)"
					id="g5814-2"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,367.28906 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.64062 -0.22265,-0.92187 l 50.32812,-50.39063 0.20703,-0.21094 v -6.92187 c 0.83594,-0.29688 1.4375,-1.07422 1.4375,-2.01172 0,-1.19141 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96875 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 6.32812 l -50.11328,50.17969 c -0.28125,-0.13672 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203207"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#beeac1b475-1)"
					id="g5818-7"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,384.5625 c 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 13.22656 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -13.22656 c -0.30078,-0.83203 -1.07812,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203204"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 524.21549,411.59201 c 0.24047,0.0828 0.50466,0.13882 0.79255,0.13882 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.207 0.0779,0.39696 0.19306,0.57231 l -6.42506,4.62719 v 4.31303 c -0.72142,0.18753 -1.2464,0.67216 -1.2464,1.25665 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52159,-1.06912 -1.2464,-1.25665 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203201"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#5946722d62-3)"
					id="g5824-1"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 232.33984,224.78516 c -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 h 67.28906 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 1.1875,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96875,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0859,0.63672 0.21875,0.91797 l -6.98828,7 h -66.69141 c -0.29687,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203198"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#f773d7ee6f-2)"
					id="g5828-5"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 312.125,408.31641 c 0,-1.19532 -0.96875,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71484,0.60547 -2.01172,1.4375 h -82.23047 c -0.29687,-0.83203 -1.07422,-1.4375 -2.01172,-1.4375 -1.1914,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96485,2.15625 2.15625,2.15625 0.9375,0 1.71485,-0.60547 2.01172,-1.4375 h 82.23047 c 0.29688,0.83203 1.07422,1.4375 2.01172,1.4375 1.1875,0 2.15625,-0.96485 2.15625,-2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203195"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 444.61531,351.15359 c 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.58449 0.52498,1.06913 1.2464,1.25665 v 4.31303 l 30.09646,21.66986 0.1829,0.13151 h 44.87036 l 13.53765,9.74876 c -0.11516,0.17535 -0.19306,0.36531 -0.19306,0.57232 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55208,0.056 -0.79594,0.13882 l -13.71716,-9.87784 -0.18627,-0.13151 H 472.9167 l -29.54779,-21.27534 v -3.94285 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203192"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 622.23053,357.88494 c 0.81287,0 1.48348,-0.37749 1.74428,-0.89866 h 11.46822 c 0.25741,0.52117 0.93142,0.89866 1.74429,0.89866 1.03301,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83659,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48349,0.37505 -1.74429,0.89621 h -11.46822 c -0.2608,-0.52116 -0.9348,-0.89621 -1.74428,-0.89621 -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203189"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 480.13768,390.19247 c 0.81287,0 1.48687,-0.37748 1.74428,-0.89622 h 20.94831 l 7.47839,-5.38702 h 6.96358 l 6.05926,4.36417 c -0.11517,0.17535 -0.19306,0.36531 -0.19306,0.57232 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.03302,0 1.86959,-0.60397 1.86959,-1.34675 0,-0.74279 -0.83657,-1.34676 -1.86959,-1.34676 -0.28789,0 -0.55208,0.056 -0.79255,0.13882 l -6.42843,-4.62476 h -7.99321 l -7.4784,5.38459 h -20.43349 c -0.25741,-0.52117 -0.93141,-0.89865 -1.74428,-0.89865 -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74278 0.83657,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203186"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="M 525.63123,340.57194 V 325.4873 c 0.72481,-0.18509 1.2464,-0.67217 1.2464,-1.25665 0,-0.74279 -0.83657,-1.34432 -1.86959,-1.34432 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.58448 0.52498,1.07156 1.2464,1.25665 v 14.71202 l -13.53766,9.74633 c -0.24386,-0.0828 -0.50804,-0.13638 -0.79593,-0.13638 -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.20701 -0.0745,-0.39696 -0.18967,-0.57231 l 13.72055,-9.87783 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203183"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 487.61607,352.50035 c 0.28789,0 0.55208,-0.056 0.79594,-0.13882 l 13.53765,9.74876 v 3.94285 c -0.72142,0.18509 -1.2464,0.66973 -1.2464,1.25422 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25422 v -4.31546 L 489.29261,351.7259 c 0.11854,-0.17535 0.19306,-0.3653 0.19306,-0.57231 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203180"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 449.60091,356.72327 22.61807,16.28771 0.1829,0.12907 h 35.90509 c 0.26079,0.52117 0.9348,0.89866 1.74428,0.89866 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48349,0.37748 -1.74428,0.89865 H 472.9167 l -22.06939,-15.89075 v -5.01441 l 6.05926,-4.36173 c 0.24386,0.0828 0.50804,0.13881 0.79593,0.13881 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.20701 0.0745,0.39697 0.19306,0.57232 l -6.42505,4.62718 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203177"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 435.26732,368.65412 c 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -0.28789,0 -0.55207,0.056 -0.79593,0.13881 l -6.42505,-4.62476 h -5.99152 c -0.2608,-0.52116 -0.9348,-0.89864 -1.74428,-0.89864 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74522 0.83657,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37749 1.74428,-0.89622 h 5.47671 l 6.05925,4.36174 c -0.11854,0.17534 -0.19306,0.3653 -0.19306,0.57231 0,0.74279 0.83658,1.34676 1.8696,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203174"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 639.05692,367.30736 c 0,-0.74278 -0.83659,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58448 0.52498,1.06913 1.2464,1.25665 v 4.31303 l 13.90344,10.01178 c -0.11516,0.17534 -0.19306,0.3653 -0.19306,0.57231 0,0.74278 0.83658,1.34675 1.8696,1.34675 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -13.53765,-9.74633 v -3.94285 c 0.72142,-0.18752 1.2464,-0.67217 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203171"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#f78a6aa82b-4)"
					id="g5848-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 195.68359,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71875 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203168"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 412.03621,352.36153 c 0.24386,0.0828 0.50804,0.13882 0.79593,0.13882 1.03303,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.20701 0.0745,0.39696 0.18967,0.57231 l -13.72055,9.88027 -0.17951,0.13151 v 4.31546 c -0.72481,0.18509 -1.2464,0.66973 -1.2464,1.25422 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25422 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203165"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 465.18089,419.80649 c -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74279 0.83657,1.34676 1.86959,1.34676 0.81287,0 1.48349,-0.37749 1.74429,-0.89866 h 5.4767 l 7.47839,5.38459 h 20.94831 c 0.26079,0.52117 0.9348,0.89865 1.74428,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.80948,0 -1.48349,0.37748 -1.74428,0.89865 h -20.43349 l -7.47839,-5.38459 h -5.99152 c -0.25742,-0.52117 -0.93142,-0.89865 -1.74429,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203162"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 592.94016,333.74561 v -4.31546 l -6.42505,-4.62719 c 0.11515,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83997,-1.34432 -1.8696,-1.34432 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.74522 0.83657,1.34675 1.8696,1.34675 0.28789,0 0.55207,-0.056 0.79593,-0.13881 l 6.05926,4.36417 v 3.94285 c -0.72481,0.18509 -1.2464,0.66973 -1.2464,1.25422 0,0.74522 0.83658,1.34675 1.8696,1.34675 1.03302,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203159"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 457.0793,356.72327 13.90345,10.01178 c -0.11517,0.17534 -0.19306,0.3653 -0.19306,0.57231 0,0.74279 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 -0.28789,0 -0.55208,0.056 -0.79594,0.13881 l -13.53765,-9.74633 v -5.01441 l 6.05926,-4.36173 c 0.24386,0.0828 0.50804,0.13881 0.79593,0.13881 1.03303,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.20701 0.0779,0.39697 0.19305,0.57232 l -6.42505,4.62718 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203156"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 442.74571,417.11542 c 0.80948,0 1.48349,-0.37749 1.74429,-0.89865 h 5.99152 l 6.42505,-4.62476 c 0.24386,0.0828 0.50804,0.13882 0.79593,0.13882 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.207 0.0745,0.39696 0.19306,0.57231 l -6.05926,4.36417 H 444.49 c -0.25742,-0.52117 -0.93142,-0.89865 -1.74429,-0.89865 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74279 0.83657,1.34676 1.86959,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203153"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 532.04613,361.60617 -0.1829,0.13151 v 5.75477 l 6.42505,4.62719 c -0.11516,0.17534 -0.19306,0.3653 -0.19306,0.57231 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79254,0.13882 l -6.06265,-4.36174 v -5.01198 l 14.77728,-10.63767 0.18289,-0.13394 v -4.31303 c 0.72142,-0.18752 1.24301,-0.67216 1.24301,-1.25665 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.02963,0 -1.86959,0.60154 -1.86959,1.34432 0,0.58449 0.52497,1.07156 1.24978,1.25665 v 3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203150"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 467.05049,356.53818 c 0,-0.74278 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.74522 0.83657,1.34676 1.86959,1.34676 0.28789,0 0.55208,-0.056 0.79594,-0.13882 l 13.72055,9.88027 0.18289,0.13151 h 13.46991 c 0.2608,0.51873 0.93481,0.89622 1.74428,0.89622 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -0.80947,0 -1.48348,0.37747 -1.74428,0.89864 h -12.95509 l -13.53766,-9.74876 c 0.11855,-0.17535 0.19306,-0.3653 0.19306,-0.57231 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203147"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#23ff1b1a5d-1)"
					id="g5866-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 422.09375,220.46875 c 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,0.33203 0.0898,0.63672 0.22266,0.91797 l -6.98829,7 h -6.3164 c -0.29688,-0.83594 -1.07422,-1.4414 -2.01172,-1.4414 -1.19141,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96484,2.16016 2.15625,2.16016 0.9375,0 1.71484,-0.60547 2.01172,-1.44141 h 6.91015 l 7.41016,-7.41797 c 0.28125,0.13282 0.58594,0.22266 0.91797,0.22266 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203144"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<g
					clip-path="url(#16634a2329-5)"
					id="g5870-0"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 180.58984,350.01562 c 1.19141,0 2.15625,-0.96484 2.15625,-2.15625 0,-0.33203 -0.0898,-0.63671 -0.22265,-0.91796 l 15.61328,-15.63672 h 6.3164 c 0.29688,0.83593 1.07422,1.4414 2.01172,1.4414 1.19141,0 2.15625,-0.96875 2.15625,-2.16015 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.93359,0 -1.71093,0.60547 -2.01172,1.4375 h -6.91015 l -16.03516,16.05859 c -0.28125,-0.13281 -0.58594,-0.22265 -0.91797,-0.22265 -1.1914,0 -2.15625,0.96484 -2.15625,2.16015 0,1.19141 0.96485,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203141"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 509.42805,339.1302 c -0.72142,0.18509 -1.2464,0.66973 -1.2464,1.25421 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.58448 -0.52159,-1.06912 -1.2464,-1.25421 v -9.32744 l 6.06265,-4.36417 c 0.24047,0.0852 0.50465,0.13881 0.79254,0.13881 1.03303,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34432 -1.8696,-1.34432 -1.03302,0 -1.8696,0.60153 -1.8696,1.34432 0,0.207 0.0779,0.3994 0.19306,0.57231 l -6.42505,4.62719 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203138"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#bc99b6b289-16)"
					id="g5876-6"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 187.05859,408.31641 c 0,1.1914 0.96485,2.15625 2.15625,2.15625 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-0.9375 -0.60547,-1.71485 -1.4375,-2.01563 v -13.24609 c 0.83203,-0.29688 1.4375,-1.07813 1.4375,-2.01172 0,-1.19531 -0.96484,-2.16016 -2.15625,-2.16016 -1.1914,0 -2.15625,0.96485 -2.15625,2.16016 0,0.9375 0.60547,1.71484 1.4375,2.01172 v 13.24609 c -0.83203,0.29688 -1.4375,1.07813 -1.4375,2.01563 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203135"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 426.04465,378.52464 c 0.25741,0.52117 0.93141,0.89865 1.74428,0.89865 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48687,0.37748 -1.74428,0.89865 h -5.99152 l -6.42844,4.62476 c -0.24047,-0.0828 -0.50466,-0.13882 -0.79255,-0.13882 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83657,1.34675 1.86959,1.34675 1.03303,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57231 l 6.05927,-4.36418 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203132"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 412.83214,341.73117 c 0.80948,0 1.48349,-0.37748 1.74429,-0.89622 h 13.46991 l 7.84418,-5.6476 v -5.7572 l -7.84418,-5.64761 h -28.4267 c -0.26079,-0.52117 -0.9348,-0.89621 -1.74428,-0.89621 -1.03303,0 -1.8696,0.60153 -1.8696,1.34432 0,0.74522 0.83657,1.34675 1.8696,1.34675 0.80948,0 1.48349,-0.37748 1.74428,-0.89865 h 27.91189 l 7.11259,5.12401 v 5.01197 l -7.11259,5.12158 h -12.9551 c -0.2608,-0.52117 -0.93481,-0.89622 -1.74429,-0.89622 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.74522 0.83657,1.34676 1.86959,1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203129"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 396.00576,356.53818 c 0,0.74522 0.83657,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06912 -1.2464,-1.25421 v -13.64291 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.58449 0.52159,1.06913 1.2464,1.25665 v 13.64291 c -0.72481,0.18509 -1.2464,0.66972 -1.2464,1.25421 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203126"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 457.7025,395.57706 c 1.03302,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34676 -1.8696,-1.34676 -0.28789,0 -0.55207,0.056 -0.79593,0.13882 l -12.48432,-8.98893 c 0.11517,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83657,1.34675 1.86959,1.34675 0.28789,0 0.55208,-0.056 0.79594,-0.13881 l 12.48431,8.98892 c -0.11854,0.17535 -0.19306,0.3653 -0.19306,0.57232 0,0.74278 0.83658,1.34675 1.8696,1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203123"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#cf57b94926-8)"
					id="g5888-9"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 378.96875,410.47266 c 0.93359,0 1.71094,-0.60547 2.01172,-1.4375 h 47.72656 c 0.30078,0.83203 1.07422,1.4375 2.01172,1.4375 1.19141,0 2.15625,-0.96485 2.15625,-2.15625 0,-1.19532 -0.96484,-2.16016 -2.15625,-2.16016 -0.9375,0 -1.71094,0.60547 -2.01172,1.4375 h -47.72656 c -0.30078,-0.83203 -1.07813,-1.4375 -2.01172,-1.4375 -1.19141,0 -2.15625,0.96484 -2.15625,2.16016 0,1.1914 0.96484,2.15625 2.15625,2.15625 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203120"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 405.35375,328.27091 c -1.03302,0 -1.8696,0.60154 -1.8696,1.34433 0,0.74522 0.83658,1.34675 1.8696,1.34675 0.28789,0 0.55208,-0.0536 0.79255,-0.13881 l 6.42844,4.62719 h 13.46991 c 0.25741,0.51873 0.93141,0.89621 1.74428,0.89621 1.03302,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34433 -1.8696,-1.34433 -0.81287,0 -1.48687,0.37749 -1.74428,0.89622 h -12.95509 l -6.05927,-4.36174 c 0.11516,-0.17534 0.19306,-0.36774 0.19306,-0.57474 0,-0.74279 -0.83657,-1.34433 -1.8696,-1.34433 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203114"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<g
					clip-path="url(#024131cb33-3)"
					id="g5898-8"
					style="fill:#e5ddff;fill-opacity:1"
					transform="matrix(-0.86706003,0,0,-0.62345308,823.68312,568.02759)"
				>
					<path
						fill="#3a7cc3"
						d="m 268.85156,219.02734 h 30.48047 c 0.29688,0.83594 1.07422,1.44141 2.00781,1.44141 1.19141,0 2.15625,-0.96875 2.15625,-2.16016 0,-1.1914 -0.96484,-2.16015 -2.15625,-2.16015 -0.93359,0 -1.71093,0.60547 -2.00781,1.4414 h -30.48047 c -0.29687,-0.83593 -1.07422,-1.4414 -2.01172,-1.4414 -1.1914,0 -2.15625,0.96875 -2.15625,2.16015 0,1.19141 0.96485,2.16016 2.15625,2.16016 0.9375,0 1.71485,-0.60547 2.01172,-1.44141 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path203111"
						style="fill:#e5ddff;fill-opacity:1"
					/>
				</g>
				<path
					fill="#3a7cc3"
					d="m 622.23053,349.80927 c -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37749 1.74428,-0.89865 h 20.9483 l 13.90345,-10.00934 c 0.24386,0.0828 0.50805,0.13881 0.79594,0.13881 1.03301,0 1.86959,-0.60154 1.86959,-1.34676 0,-0.74278 -0.83658,-1.34432 -1.86959,-1.34432 -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.20701 0.0779,0.39697 0.19305,0.57232 l -13.53765,9.74876 h -20.43349 c -0.2608,-0.52117 -0.9348,-0.89622 -1.74428,-0.89622 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203108"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 594.05785,416.21677 h 11.47161 c 0.25741,0.52116 0.93142,0.89865 1.74429,0.89865 1.03301,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.86959,-1.34676 -0.81287,0 -1.48688,0.37748 -1.74429,0.89865 h -11.46822 c -0.2608,-0.52117 -0.9348,-0.89865 -1.74428,-0.89865 -1.03302,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37749 1.74089,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203105"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 429.65853,404.99948 c 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58449 0.52498,1.06913 1.2464,1.25665 v 13.64047 c -0.72142,0.18753 -1.2464,0.67216 -1.2464,1.25665 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.58449 -0.52498,-1.06912 -1.2464,-1.25665 v -13.64047 c 0.72142,-0.18752 1.2464,-0.67216 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203102"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 642.92143,388.39761 h -11.46822 c -0.26081,-0.52117 -0.93481,-0.89865 -1.74429,-0.89865 -1.03302,0 -1.86959,0.60397 -1.86959,1.34676 0,0.74278 0.83657,1.34675 1.86959,1.34675 0.80948,0 1.48348,-0.37748 1.74429,-0.89622 h 11.46822 c 0.2574,0.51874 0.93141,0.89622 1.74428,0.89622 1.03301,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.74279 -0.83659,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48688,0.37748 -1.74428,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203099"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 568.01218,378.07654 c 0,0.74278 0.83658,1.34675 1.8696,1.34675 1.02964,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.58449 -0.52498,-1.06913 -1.24979,-1.25422 v -9.70005 l -6.42166,-4.62719 c 0.11515,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74278 -0.83997,-1.34675 -1.8696,-1.34675 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74522 0.83658,1.34676 1.8696,1.34676 0.2845,0 0.54868,-0.056 0.79254,-0.13882 l 6.05926,4.36174 v 9.32987 c -0.72142,0.18509 -1.24301,0.66973 -1.24301,1.25422 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203096"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 554.66758,356.09007 -13.90682,10.00935 c -0.24386,-0.0828 -0.50805,-0.13881 -0.79594,-0.13881 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.20701 -0.0745,-0.39697 -0.18967,-0.57231 l 13.53765,-9.74877 h 5.47671 c 0.2574,0.52117 0.93141,0.89866 1.74428,0.89866 1.02963,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83997,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48688,0.37505 -1.74428,0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203093"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 397.25216,330.87189 v 4.31546 l 15.13629,10.90069 0.18629,0.12907 h 5.99151 c 0.25742,0.52116 0.93142,0.89865 1.74429,0.89865 1.03302,0 1.86959,-0.60154 1.86959,-1.34676 0,-0.74278 -0.83657,-1.34432 -1.86959,-1.34432 -0.81287,0 -1.48687,0.37505 -1.74429,0.89622 h -5.47669 l -14.591,-10.50617 v -3.94284 c 0.72142,-0.18753 1.2464,-0.67217 1.2464,-1.25665 0,-0.74279 -0.83658,-1.34433 -1.8696,-1.34433 -1.03303,0 -1.8696,0.60154 -1.8696,1.34433 0,0.58448 0.52159,1.07156 1.2464,1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203090"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 594.18656,340.38441 c 0,-0.74278 -0.83658,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48688,0.37505 -1.74428,0.89622 h -5.47671 l -13.53765,-9.74633 c 0.11515,-0.17534 0.19306,-0.36774 0.19306,-0.57474 0,-0.74279 -0.83996,-1.34433 -1.8696,-1.34433 -1.03302,0 -1.8696,0.60154 -1.8696,1.34433 0,0.74522 0.83658,1.34675 1.8696,1.34675 0.2845,0 0.54869,-0.0536 0.79255,-0.13881 l 13.72393,9.88027 0.18289,0.1315 h 5.99153 c 0.2574,0.51874 0.93141,0.89622 1.74428,0.89622 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203087"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 435.26732,344.42468 c -1.03302,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.207 -0.0779,-0.39696 -0.19306,-0.57231 l 12.48431,-8.98892 c 0.24386,0.0852 0.50805,0.13881 0.79594,0.13881 1.03302,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83658,-1.34433 -1.8696,-1.34433 -1.03303,0 -1.8696,0.60154 -1.8696,1.34433 0,0.207 0.0745,0.39939 0.19306,0.57231 l -12.48431,8.98892 c -0.24386,-0.0828 -0.50805,-0.13638 -0.79594,-0.13638 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203084"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 642.92143,340.83495 c 0.2574,0.51874 0.93141,0.89622 1.74428,0.89622 1.03301,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83659,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48688,0.37505 -1.74428,0.89622 h -5.99153 l -6.42504,4.62475 c -0.24386,-0.0828 -0.50805,-0.13638 -0.79594,-0.13638 -1.03302,0 -1.86959,0.60154 -1.86959,1.34432 0,0.74522 0.83657,1.34676 1.86959,1.34676 1.03302,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.207 -0.0779,-0.39696 -0.19306,-0.57231 l 6.05926,-4.36174 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203081"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 472.65929,409.03732 c -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.28789,0 0.55207,-0.056 0.79593,-0.13882 l 6.42505,4.62476 h 5.99152 c 0.26079,0.52116 0.9348,0.89865 1.74428,0.89865 1.03303,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74279 -0.83657,-1.34676 -1.8696,-1.34676 -0.81287,0 -1.48687,0.37748 -1.74428,0.89865 h -5.4767 l -6.05927,-4.36417 c 0.11855,-0.17535 0.19306,-0.36531 0.19306,-0.57231 0,-0.74278 -0.83657,-1.34675 -1.86959,-1.34675 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203078"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 571.62267,361.47466 c -0.25741,-0.52116 -0.93141,-0.89864 -1.74089,-0.89864 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74522 0.83658,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37749 1.74089,-0.89622 h 5.99153 l 6.42843,-4.62719 c 0.24386,0.0828 0.50805,0.13882 0.79594,0.13882 1.02963,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83997,-1.34432 -1.8696,-1.34432 -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.20701 0.0745,0.39696 0.18967,0.57231 l -6.05926,4.36417 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203072"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 584.83857,419.80649 c -1.03303,0 -1.8696,0.60397 -1.8696,1.34676 0,0.74279 0.83657,1.34676 1.8696,1.34676 0.80948,0 1.48348,-0.37749 1.74089,-0.89866 h 18.95 c 0.25741,0.52117 0.93142,0.89866 1.74429,0.89866 1.03301,0 1.86959,-0.60397 1.86959,-1.34676 0,-0.74279 -0.83658,-1.34676 -1.86959,-1.34676 -0.81287,0 -1.48688,0.37748 -1.74429,0.89865 h -18.95 c -0.25741,-0.52117 -0.93141,-0.89865 -1.74089,-0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203069"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 472.65929,355.19386 c -1.03303,0 -1.8696,0.60154 -1.8696,1.34432 0,0.74522 0.83657,1.34676 1.8696,1.34676 0.81286,0 1.48687,-0.37749 1.74428,-0.89866 h 12.9551 l 6.05926,4.36418 c -0.11517,0.17534 -0.19306,0.3653 -0.19306,0.57231 0,0.74522 0.83657,1.34676 1.86959,1.34676 1.03303,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.74278 -0.83657,-1.34675 -1.8696,-1.34675 -0.28789,0 -0.55207,0.056 -0.79593,0.13881 l -6.42505,-4.62476 h -13.46991 c -0.2608,-0.52116 -0.93142,-0.89621 -1.74428,-0.89621 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203066"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 642.92143,319.2966 c 0.2574,0.51873 0.93141,0.89621 1.74428,0.89621 1.03301,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83659,-1.34432 -1.8696,-1.34432 -0.81287,0 -1.48688,0.37748 -1.74428,0.89621 h -5.99153 l -6.42504,4.62719 c -0.24386,-0.0852 -0.50805,-0.13881 -0.79594,-0.13881 -1.03302,0 -1.86959,0.60153 -1.86959,1.34432 0,0.74522 0.83657,1.34675 1.86959,1.34675 1.03302,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.20701 -0.0779,-0.39697 -0.19306,-0.57232 l 6.05926,-4.36173 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203063"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 494.30192,330.82318 c 0.24047,0.0852 0.50465,0.13881 0.79254,0.13881 1.03303,0 1.8696,-0.60153 1.8696,-1.34675 0,-0.74279 -0.83657,-1.34433 -1.8696,-1.34433 -1.03302,0 -1.86959,0.60154 -1.86959,1.34433 0,0.207 0.0779,0.3994 0.19306,0.57474 l -6.42506,4.62475 v 4.31547 c -0.72142,0.18509 -1.2464,0.66973 -1.2464,1.25421 0,0.74522 0.83658,1.34676 1.8696,1.34676 1.03303,0 1.8696,-0.60154 1.8696,-1.34676 0,-0.58448 -0.52498,-1.06912 -1.2464,-1.25421 v -3.94285 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203060"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 450.22411,411.73083 c 1.03302,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83658,-1.34675 -1.8696,-1.34675 -0.81287,0 -1.48687,0.37747 -1.74428,0.89864 H 437.0116 c -0.26079,-0.52117 -0.9348,-0.89864 -1.74428,-0.89864 -1.03302,0 -1.8696,0.60397 -1.8696,1.34675 0,0.74279 0.83658,1.34676 1.8696,1.34676 0.81287,0 1.48349,-0.37749 1.74428,-0.89865 h 11.46823 c 0.25741,0.52116 0.93141,0.89865 1.74428,0.89865 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203057"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="m 586.70817,361.92277 c 0,-0.74278 -0.83997,-1.34675 -1.8696,-1.34675 -1.03303,0 -1.8696,0.60397 -1.8696,1.34675 0,0.58448 0.52159,1.06913 1.2464,1.25665 v 13.6429 c -0.72481,0.18509 -1.2464,0.66973 -1.2464,1.25422 0,0.74278 0.83657,1.34675 1.8696,1.34675 1.02963,0 1.8696,-0.60397 1.8696,-1.34675 0,-0.58449 -0.52498,-1.06913 -1.2464,-1.25422 v -13.6429 c 0.72142,-0.18752 1.2464,-0.67217 1.2464,-1.25665 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203054"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
				<path
					fill="#3a7cc3"
					d="M 560.65911,366.85925 H 549.1875 c -0.25742,-0.52117 -0.93142,-0.89864 -1.74429,-0.89864 -1.02963,0 -1.86959,0.60397 -1.86959,1.34675 0,0.74279 0.83996,1.34676 1.86959,1.34676 0.81287,0 1.48687,-0.37749 1.74429,-0.89622 h 11.47161 c 0.2574,0.51873 0.93141,0.89622 1.74428,0.89622 1.02963,0 1.8696,-0.60397 1.8696,-1.34676 0,-0.74278 -0.83997,-1.34675 -1.8696,-1.34675 -0.81287,0 -1.48688,0.37747 -1.74428,0.89864 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path203048"
					style="fill:#e5ddff;fill-opacity:1;stroke-width:0.735236"
				/>
			</g>
		</g>
		<g
			inkscape:groupmode="layer"
			id="layer2"
			inkscape:label="edges"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		>
			<g id="g101979" transform="translate(-1.6021484e-5)">
				<g id="g5117" transform="matrix(0.39810477,0,0,0.39810477,-86.740087,101.2137)">
					<g clip-path="url(#65456aac5f)" id="g4670" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 493.14453,413.65234 h -1.56641 V 178.67578 l 89.13282,-89.070311 h 192.69922 v 1.5625 H 581.35547 l -88.21094,88.156251 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4668"
						/>
					</g>
					<g clip-path="url(#69488bb349)" id="g4674" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,343.05469 -1.10547,-1.10547 35.47266,-35.45313 V 198.00391 l 97.84375,-97.8125 h 52.79687 l 10.34766,-10.359379 1.10547,1.105469 -10.80469,10.81641 h -52.80078 l -96.92578,96.89843 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4672"
						/>
					</g>
					<g clip-path="url(#b46a85b818)" id="g4678" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,322.98828 -1.10547,-1.10547 35.47266,-35.45312 V 177.9375 l 48.12891,-48.11328 h 20.39453 v 1.5625 h -19.7461 l -47.21484,47.20312 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4676"
						/>
					</g>
					<g clip-path="url(#931287b357)" id="g4682" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,303.30078 35.69922,-35.68359 1.10546,1.10547 -35.69921,35.68359 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4680"
						/>
					</g>
					<g clip-path="url(#9f8d5c6b67)" id="g4686" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,284.71875 35.69922,-35.68359 1.10937,1.10546 -35.70312,35.6836 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4684"
						/>
					</g>
					<g clip-path="url(#a131c9c548)" id="g4690" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,266.13672 35.69922,-35.6836 1.10546,1.10547 -35.69921,35.6875 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4688"
						/>
					</g>
					<path
						fill="#5e17eb"
						d="m 614.9864,230.63339 -6.41406,6.41015 h -19.41797 l -80.01953,79.96875 v 36.32422 l -14.875,14.8711 v -48.96094 l 88.67188,-88.61328 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4692"
					/>
					<path
						fill="#5e17eb"
						d="m 616.28718,251.48886 h 32.4375 v 1.5625 h -32.4375 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4694"
					/>
					<path
						fill="#5e17eb"
						d="m 604.71687,263.05526 h 26.71875 v 1.5625 h -26.71875 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4696"
					/>
				</g>
				<g id="g5117-5" transform="matrix(0.39810477,0,0,-0.39810477,-86.740087,526.49765)">
					<g clip-path="url(#65456aac5f-4)" id="g4670-1" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 493.14453,413.65234 h -1.56641 V 178.67578 l 89.13282,-89.070311 h 192.69922 v 1.5625 H 581.35547 l -88.21094,88.156251 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4668-7"
						/>
					</g>
					<g clip-path="url(#69488bb349-9)" id="g4674-4" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,343.05469 -1.10547,-1.10547 35.47266,-35.45313 V 198.00391 l 97.84375,-97.8125 h 52.79687 l 10.34766,-10.359379 1.10547,1.105469 -10.80469,10.81641 h -52.80078 l -96.92578,96.89843 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4672-31"
						/>
					</g>
					<g clip-path="url(#b46a85b818-6)" id="g4678-4" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,322.98828 -1.10547,-1.10547 35.47266,-35.45312 V 177.9375 l 48.12891,-48.11328 h 20.39453 v 1.5625 h -19.7461 l -47.21484,47.20312 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4676-6"
						/>
					</g>
					<g clip-path="url(#931287b357-5)" id="g4682-9" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,303.30078 35.69922,-35.68359 1.10546,1.10547 -35.69921,35.68359 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4680-4"
						/>
					</g>
					<g clip-path="url(#9f8d5c6b67-2)" id="g4686-2" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,284.71875 35.69922,-35.68359 1.10937,1.10546 -35.70312,35.6836 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4684-2"
						/>
					</g>
					<g clip-path="url(#a131c9c548-4)" id="g4690-6" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,266.13672 35.69922,-35.6836 1.10546,1.10547 -35.69921,35.6875 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4688-4"
						/>
					</g>
					<path
						fill="#5e17eb"
						d="m 614.9864,230.63339 -6.41406,6.41015 h -19.41797 l -80.01953,79.96875 v 36.32422 l -14.875,14.8711 v -48.96094 l 88.67188,-88.61328 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4692-1"
					/>
					<path
						fill="#5e17eb"
						d="m 616.28718,251.48886 h 32.4375 v 1.5625 h -32.4375 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4694-2"
					/>
					<path
						fill="#5e17eb"
						d="m 604.71687,263.05526 h 26.71875 v 1.5625 h -26.71875 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4696-8"
					/>
				</g>
				<g id="g5117-9" transform="matrix(-0.39810477,0,0,0.39810477,867.2331,101.2137)">
					<g clip-path="url(#65456aac5f-9)" id="g4670-0" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 493.14453,413.65234 h -1.56641 V 178.67578 l 89.13282,-89.070311 h 192.69922 v 1.5625 H 581.35547 l -88.21094,88.156251 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4668-2"
						/>
					</g>
					<g clip-path="url(#69488bb349-1)" id="g4674-8" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,343.05469 -1.10547,-1.10547 35.47266,-35.45313 V 198.00391 l 97.84375,-97.8125 h 52.79687 l 10.34766,-10.359379 1.10547,1.105469 -10.80469,10.81641 h -52.80078 l -96.92578,96.89843 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4672-3"
						/>
					</g>
					<g clip-path="url(#b46a85b818-4)" id="g4678-8" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 492.91406,322.98828 -1.10547,-1.10547 35.47266,-35.45312 V 177.9375 l 48.12891,-48.11328 h 20.39453 v 1.5625 h -19.7461 l -47.21484,47.20312 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4676-0"
						/>
					</g>
					<g clip-path="url(#931287b357-2)" id="g4682-4" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,303.30078 35.69922,-35.68359 1.10546,1.10547 -35.69921,35.68359 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4680-0"
						/>
					</g>
					<g clip-path="url(#9f8d5c6b67-0)" id="g4686-9" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,284.71875 35.69922,-35.68359 1.10937,1.10546 -35.70312,35.6836 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4684-1"
						/>
					</g>
					<g clip-path="url(#a131c9c548-5)" id="g4690-9" transform="translate(1.8965616,140.24667)">
						<path
							fill="#5e17eb"
							d="m 491.80469,266.13672 35.69922,-35.6836 1.10546,1.10547 -35.69921,35.6875 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4688-6"
						/>
					</g>
					<path
						fill="#5e17eb"
						d="m 614.9864,230.63339 -6.41406,6.41015 h -19.41797 l -80.01953,79.96875 v 36.32422 l -14.875,14.8711 v -48.96094 l 88.67188,-88.61328 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4692-2"
					/>
					<path
						fill="#5e17eb"
						d="m 616.28718,251.48886 h 32.4375 v 1.5625 h -32.4375 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4694-5"
					/>
					<path
						fill="#5e17eb"
						d="m 604.71687,263.05526 h 26.71875 v 1.5625 h -26.71875 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4696-4"
					/>
				</g>
				<g id="g5117-9-3" transform="matrix(-0.39810477,0,0,-0.39810477,867.2331,526.49765)">
					<g
						clip-path="url(#65456aac5f-9-8)"
						id="g4670-0-8"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 493.14453,413.65234 h -1.56641 V 178.67578 l 89.13282,-89.070311 h 192.69922 v 1.5625 H 581.35547 l -88.21094,88.156251 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4668-2-0"
						/>
					</g>
					<g
						clip-path="url(#69488bb349-1-2)"
						id="g4674-8-4"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 492.91406,343.05469 -1.10547,-1.10547 35.47266,-35.45313 V 198.00391 l 97.84375,-97.8125 h 52.79687 l 10.34766,-10.359379 1.10547,1.105469 -10.80469,10.81641 h -52.80078 l -96.92578,96.89843 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4672-3-7"
						/>
					</g>
					<g
						clip-path="url(#b46a85b818-4-8)"
						id="g4678-8-6"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 492.91406,322.98828 -1.10547,-1.10547 35.47266,-35.45312 V 177.9375 l 48.12891,-48.11328 h 20.39453 v 1.5625 h -19.7461 l -47.21484,47.20312 v 108.48828 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4676-0-8"
						/>
					</g>
					<g
						clip-path="url(#931287b357-2-6)"
						id="g4682-4-9"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 491.80469,303.30078 35.69922,-35.68359 1.10546,1.10547 -35.69921,35.68359 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4680-0-0"
						/>
					</g>
					<g
						clip-path="url(#9f8d5c6b67-0-3)"
						id="g4686-9-6"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 491.80469,284.71875 35.69922,-35.68359 1.10937,1.10546 -35.70312,35.6836 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4684-1-8"
						/>
					</g>
					<g
						clip-path="url(#a131c9c548-5-3)"
						id="g4690-9-7"
						transform="translate(1.8965616,140.24667)"
					>
						<path
							fill="#5e17eb"
							d="m 491.80469,266.13672 35.69922,-35.6836 1.10546,1.10547 -35.69921,35.6875 z m 0,0"
							fill-opacity="1"
							fill-rule="nonzero"
							id="path4688-6-9"
						/>
					</g>
					<path
						fill="#5e17eb"
						d="m 614.9864,230.63339 -6.41406,6.41015 h -19.41797 l -80.01953,79.96875 v 36.32422 l -14.875,14.8711 v -48.96094 l 88.67188,-88.61328 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4692-2-0"
					/>
					<path
						fill="#5e17eb"
						d="m 616.28718,251.48886 h 32.4375 v 1.5625 h -32.4375 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4694-5-3"
					/>
					<path
						fill="#5e17eb"
						d="m 604.71687,263.05526 h 26.71875 v 1.5625 h -26.71875 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path4696-4-3"
					/>
				</g>
			</g>
		</g>
		<g
			inkscape:groupmode="layer"
			id="layer4"
			inkscape:label="control"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		>
			<g
				clip-path="url(#03ff9b82e1-9)"
				id="g4798-7"
				transform="matrix(1.046876,0,0,2.2147603,15.468458,22.480231)"
				style="fill:#ffffff;fill-opacity:1;stroke:#5e17eb;stroke-width:0.49255;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
			>
				<path
					stroke-linecap="butt"
					transform="matrix(0.230556,0,0,0.230341,70.077444,44.400373)"
					fill="none"
					stroke-linejoin="miter"
					d="m 1431.971,161.14903 v 345.192 l -89.3052,89.30391 H 493.88437 V 256.10015 l 94.94722,-94.95112 z m 0,0"
					stroke="#01ffff"
					stroke-width="4"
					stroke-opacity="1"
					stroke-miterlimit="10"
					id="path4796-9"
					style="fill:#ffffff;fill-opacity:1;stroke:#5e17eb;stroke-width:2.13735;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
				/>
			</g>
			<g
				id="g105023-2-2"
				transform="matrix(-0.65371113,0,0,-0.65371113,423.89038,228.64267)"
				style="fill-opacity:1;stroke:#5e17eb"
			>
				<g
					clip-path="url(#42d7fac3ef-83-7)"
					id="g4790-4-1"
					transform="translate(-190.05395,-245.98592)"
					style="fill-opacity:1;stroke:#5e17eb"
				>
					<path
						stroke-linecap="butt"
						transform="matrix(0.230556,0,0,0.230341,70.077444,44.400373)"
						fill="none"
						stroke-linejoin="miter"
						d="M 63.639956,715.62693 262.36158,393.7869 h 187.91213"
						stroke="#01ffff"
						stroke-width="4"
						stroke-opacity="1"
						stroke-miterlimit="10"
						id="path4788-5-3"
						style="fill-opacity:1;stroke:#5e17eb"
					/>
				</g>
				<g
					clip-path="url(#f0bbbbc5b0-7-2)"
					id="g4794-0-4"
					transform="translate(-190.05395,-245.98592)"
					style="fill-opacity:1;stroke:#5e17eb"
				>
					<path
						stroke-linecap="butt"
						transform="matrix(0.230556,0,0,0.230341,70.077444,44.400373)"
						fill="none"
						stroke-linejoin="miter"
						d="m 74.906891,733.68783 c 0,1.45843 -0.152485,2.89992 -0.440512,4.32444 -0.271084,1.42452 -0.694653,2.81512 -1.253764,4.15485 -0.559111,1.33973 -1.236822,2.61162 -2.050074,3.81568 -0.79631,1.22102 -1.711219,2.34028 -2.744727,3.3578 -1.033508,1.03447 -2.15173,1.95024 -3.354666,2.76425 -1.219879,0.79705 -2.490586,1.4754 -3.829064,2.03503 -1.338478,0.55963 -2.727784,0.9836 -4.150976,1.27189 -1.423191,0.27134 -2.863326,0.42397 -4.320403,0.42397 -1.457077,0 -2.897212,-0.15263 -4.320404,-0.42397 -1.423191,-0.28829 -2.812498,-0.71226 -4.150976,-1.27189 -1.35542,-0.55963 -2.626127,-1.23798 -3.829063,-2.03503 -1.202936,-0.81401 -2.338101,-1.72978 -3.354666,-2.76425 -1.033509,-1.01752 -1.948418,-2.13678 -2.76167,-3.3578 -0.79631,-1.20406 -1.490963,-2.47595 -2.033131,-3.81568 -0.559111,-1.33973 -0.98268,-2.73033 -1.270707,-4.15485 -0.288027,-1.42452 -0.423569,-2.86601 -0.423569,-4.32444 0,-1.45844 0.135542,-2.88296 0.423569,-4.32444 0.288027,-1.42452 0.711596,-2.79817 1.270707,-4.1379 0.542168,-1.35668 1.236821,-2.62858 2.033131,-3.83264 0.813252,-1.20406 1.728161,-2.32332 2.76167,-3.3578 1.016565,-1.03447 2.15173,-1.95023 3.354666,-2.74729 1.202936,-0.81401 2.473643,-1.49235 3.829063,-2.05199 1.338478,-0.55963 2.727785,-0.9836 4.150976,-1.25493 1.423192,-0.2883 2.863327,-0.42397 4.320404,-0.42397 1.457077,0 2.897212,0.13567 4.320403,0.42397 1.423192,0.27133 2.812498,0.6953 4.150976,1.25493 1.338478,0.55964 2.609185,1.23798 3.829064,2.05199 1.202936,0.79706 2.321158,1.71282 3.354666,2.74729 1.033508,1.03448 1.948417,2.15374 2.744727,3.3578 0.813252,1.20406 1.490963,2.47596 2.050074,3.83264 0.559111,1.33973 0.98268,2.71338 1.253764,4.1379 0.288027,1.44148 0.440512,2.866 0.440512,4.32444 z m 0,0"
						stroke="#01ffff"
						stroke-width="4"
						stroke-opacity="1"
						stroke-miterlimit="10"
						id="path4792-5-9"
						style="fill-opacity:1;stroke:#5e17eb"
					/>
				</g>
			</g>
			<g
				id="g105023-2-2-2"
				transform="matrix(-0.65371113,0,0,0.65371113,423.89038,394.61001)"
				style="fill-opacity:1;stroke:#5e17eb"
			>
				<g
					clip-path="url(#42d7fac3ef-83-7-1)"
					id="g4790-4-1-2"
					transform="translate(-190.05395,-245.98592)"
					style="fill-opacity:1;stroke:#5e17eb"
				>
					<path
						stroke-linecap="butt"
						transform="matrix(0.230556,0,0,0.230341,70.077444,44.400373)"
						fill="none"
						stroke-linejoin="miter"
						d="M 63.639956,715.62693 262.36158,393.7869 h 187.91213"
						stroke="#01ffff"
						stroke-width="4"
						stroke-opacity="1"
						stroke-miterlimit="10"
						id="path4788-5-3-9"
						style="fill-opacity:1;stroke:#5e17eb"
					/>
				</g>
				<g
					clip-path="url(#f0bbbbc5b0-7-2-2)"
					id="g4794-0-4-7"
					transform="translate(-190.05395,-245.98592)"
					style="fill-opacity:1;stroke:#5e17eb"
				>
					<path
						stroke-linecap="butt"
						transform="matrix(0.230556,0,0,0.230341,70.077444,44.400373)"
						fill="none"
						stroke-linejoin="miter"
						d="m 74.906891,733.68783 c 0,1.45843 -0.152485,2.89992 -0.440512,4.32444 -0.271084,1.42452 -0.694653,2.81512 -1.253764,4.15485 -0.559111,1.33973 -1.236822,2.61162 -2.050074,3.81568 -0.79631,1.22102 -1.711219,2.34028 -2.744727,3.3578 -1.033508,1.03447 -2.15173,1.95024 -3.354666,2.76425 -1.219879,0.79705 -2.490586,1.4754 -3.829064,2.03503 -1.338478,0.55963 -2.727784,0.9836 -4.150976,1.27189 -1.423191,0.27134 -2.863326,0.42397 -4.320403,0.42397 -1.457077,0 -2.897212,-0.15263 -4.320404,-0.42397 -1.423191,-0.28829 -2.812498,-0.71226 -4.150976,-1.27189 -1.35542,-0.55963 -2.626127,-1.23798 -3.829063,-2.03503 -1.202936,-0.81401 -2.338101,-1.72978 -3.354666,-2.76425 -1.033509,-1.01752 -1.948418,-2.13678 -2.76167,-3.3578 -0.79631,-1.20406 -1.490963,-2.47595 -2.033131,-3.81568 -0.559111,-1.33973 -0.98268,-2.73033 -1.270707,-4.15485 -0.288027,-1.42452 -0.423569,-2.86601 -0.423569,-4.32444 0,-1.45844 0.135542,-2.88296 0.423569,-4.32444 0.288027,-1.42452 0.711596,-2.79817 1.270707,-4.1379 0.542168,-1.35668 1.236821,-2.62858 2.033131,-3.83264 0.813252,-1.20406 1.728161,-2.32332 2.76167,-3.3578 1.016565,-1.03447 2.15173,-1.95023 3.354666,-2.74729 1.202936,-0.81401 2.473643,-1.49235 3.829063,-2.05199 1.338478,-0.55963 2.727785,-0.9836 4.150976,-1.25493 1.423192,-0.2883 2.863327,-0.42397 4.320404,-0.42397 1.457077,0 2.897212,0.13567 4.320403,0.42397 1.423192,0.27133 2.812498,0.6953 4.150976,1.25493 1.338478,0.55964 2.609185,1.23798 3.829064,2.05199 1.202936,0.79706 2.321158,1.71282 3.354666,2.74729 1.033508,1.03448 1.948417,2.15374 2.744727,3.3578 0.813252,1.20406 1.490963,2.47596 2.050074,3.83264 0.559111,1.33973 0.98268,2.71338 1.253764,4.1379 0.288027,1.44148 0.440512,2.866 0.440512,4.32444 z m 0,0"
						stroke="#01ffff"
						stroke-width="4"
						stroke-opacity="1"
						stroke-miterlimit="10"
						id="path4792-5-9-4"
						style="fill-opacity:1;stroke:#5e17eb"
					/>
				</g>
			</g>
			<g
				clip-path="url(#2829f2d612)"
				id="g131501"
				transform="matrix(0.32475783,0,0,0.32475783,92.63423,183.90688)"
				style="fill:#5e17eb;fill-opacity:1"
			/>
			<g id="g161409" transform="translate(19.5)">
				<path
					fill="#8c52ff"
					d="m 429.10937,53.226562 h 12.44141 v 12.4375 h -12.44141 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path131499"
					style="fill:#5e17eb;fill-opacity:1"
					transform="matrix(0.32475783,0,0,0.32475783,92.634232,183.90688)"
				/>
				<path
					fill="#8c52ff"
					d="m 169.78451,258.42358 c 0,-0.55183 -0.0279,-1.1024 -0.0812,-1.65296 -0.0545,-0.5493 -0.13574,-1.09353 -0.24357,-1.63521 -0.10783,-0.54169 -0.24103,-1.07703 -0.40214,-1.60476 -0.15984,-0.52773 -0.34505,-1.04785 -0.55691,-1.55783 -0.21185,-0.50997 -0.44781,-1.00852 -0.70787,-1.49439 -0.26006,-0.48714 -0.54422,-0.96032 -0.84995,-1.41954 -0.307,-0.45923 -0.63556,-0.90197 -0.98696,-1.32821 -0.35013,-0.42625 -0.72056,-0.83473 -1.11128,-1.22545 -0.38946,-0.39073 -0.79921,-0.76116 -1.22546,-1.11129 -0.42751,-0.35012 -0.87024,-0.67869 -1.32947,-0.98442 -0.45923,-0.30699 -0.93241,-0.59116 -1.41955,-0.85122 -0.48714,-0.26006 -0.98569,-0.49602 -1.49566,-0.7066 -0.50997,-0.21186 -1.03009,-0.39707 -1.55782,-0.55817 -0.529,-0.15985 -1.06435,-0.29305 -1.60604,-0.40088 -0.54168,-0.10783 -1.08717,-0.18902 -1.63647,-0.24357 -0.54929,-0.0533 -1.10113,-0.0812 -1.65296,-0.0812 -0.55184,0 -1.10367,0.0279 -1.65297,0.0812 -0.5493,0.0545 -1.09479,0.13574 -1.63648,0.24357 -0.54168,0.10783 -1.07702,0.24103 -1.60603,0.40088 -0.52773,0.1611 -1.04785,0.34631 -1.55782,0.55817 -0.50997,0.21058 -1.00852,0.44654 -1.49566,0.7066 -0.48714,0.26006 -0.96032,0.54423 -1.41955,0.85122 -0.45923,0.30573 -0.90196,0.6343 -1.32948,0.98442 -0.42624,0.35013 -0.83599,0.72056 -1.22545,1.11129 -0.39072,0.39072 -0.76115,0.7992 -1.11128,1.22545 -0.3514,0.42624 -0.67996,0.86898 -0.98696,1.32821 -0.30573,0.45922 -0.58989,0.9324 -0.84995,1.41954 -0.26006,0.48587 -0.49601,0.98442 -0.70787,1.49439 -0.21185,0.50998 -0.39706,1.0301 -0.55691,1.55783 -0.16111,0.52773 -0.29431,1.06307 -0.40214,1.60476 -0.10783,0.54168 -0.18902,1.08591 -0.24357,1.63521 -0.0533,0.55056 -0.0812,1.10113 -0.0812,1.65296 0,0.55184 0.0279,1.10241 0.0812,1.6517 0.0546,0.5493 0.13574,1.09479 0.24357,1.63648 0.10783,0.54168 0.24103,1.07576 0.40214,1.60476 0.15985,0.52773 0.34506,1.04658 0.55691,1.55655 0.21186,0.50997 0.44781,1.00853 0.70787,1.49566 0.26006,0.48714 0.54422,0.96032 0.84995,1.41828 0.307,0.45923 0.63556,0.90197 0.98696,1.32948 0.35013,0.42624 0.72056,0.83473 1.11128,1.22545 0.38946,0.38946 0.79921,0.75988 1.22545,1.11001 0.42752,0.35013 0.87025,0.6787 1.32948,0.9857 0.45923,0.30699 0.93241,0.58989 1.41955,0.84995 0.48714,0.26006 0.98569,0.49602 1.49566,0.70786 0.50997,0.21059 1.03009,0.39707 1.55782,0.55692 0.52901,0.15984 1.06435,0.29431 1.60603,0.40214 0.54169,0.10783 1.08718,0.18902 1.63648,0.2423 0.5493,0.0545 1.10113,0.0812 1.65297,0.0812 0.55183,0 1.1024,-0.0279 1.65169,-0.0825 0.55057,-0.0545 1.09606,-0.13574 1.63648,-0.24357 0.54168,-0.1091 1.07703,-0.24356 1.60476,-0.40341 0.529,-0.16111 1.04785,-0.34632 1.55782,-0.55818 0.50997,-0.21185 1.00853,-0.44781 1.49439,-0.70787 0.48714,-0.26006 0.96032,-0.54422 1.41955,-0.84995 0.45923,-0.307 0.90197,-0.63556 1.32821,-0.98569 0.42624,-0.35013 0.83473,-0.72055 1.22545,-1.11001 0.39073,-0.39073 0.76116,-0.79921 1.11128,-1.22546 0.35013,-0.42624 0.6787,-0.86897 0.9857,-1.32821 0.30699,-0.45923 0.59116,-0.93113 0.85122,-1.41827 0.26005,-0.48587 0.49601,-0.98442 0.70787,-1.49439 0.21185,-0.50998 0.39833,-1.02883 0.55817,-1.55656 0.16111,-0.52773 0.29559,-1.06307 0.40341,-1.60349 0.10783,-0.54169 0.18902,-1.08591 0.24357,-1.63521 0.0558,-0.54929 0.0825,-1.09986 0.0837,-1.6517 z m -33.38789,0 c 0,-0.54168 0.0266,-1.08083 0.0799,-1.61871 0.052,-0.53915 0.13193,-1.07322 0.23722,-1.60349 0.1053,-0.53027 0.23723,-1.05547 0.39453,-1.57305 0.15731,-0.51758 0.33871,-1.02629 0.54549,-1.5261 0.20805,-0.49983 0.43893,-0.98823 0.69392,-1.46522 0.25498,-0.47699 0.5328,-0.94003 0.83346,-1.39037 0.30065,-0.44908 0.62287,-0.88294 0.96666,-1.30157 0.34252,-0.41863 0.70533,-0.81824 1.08845,-1.20135 0.38311,-0.38185 0.78398,-0.74466 1.20135,-1.08845 0.41863,-0.34252 0.85249,-0.66474 1.30283,-0.96539 0.45035,-0.30066 0.91339,-0.57848 1.39164,-0.83346 0.47699,-0.25499 0.96539,-0.48587 1.46522,-0.69265 0.49982,-0.20678 1.00852,-0.38945 1.52737,-0.54549 0.51759,-0.15731 1.04151,-0.28924 1.57305,-0.39453 0.53027,-0.1053 1.06561,-0.18522 1.60349,-0.23723 0.53915,-0.0533 1.0783,-0.0799 1.61999,-0.0799 0.54168,0 1.08083,0.0266 1.61998,0.0799 0.53788,0.052 1.07322,0.13193 1.60349,0.23723 0.53154,0.10529 1.05546,0.23722 1.57305,0.39453 0.51885,0.15604 1.02755,0.33871 1.52737,0.54549 0.49983,0.20678 0.98823,0.43766 1.46522,0.69265 0.47826,0.25498 0.94129,0.5328 1.39164,0.83346 0.45034,0.30065 0.8842,0.62287 1.30283,0.96539 0.41737,0.34379 0.81824,0.7066 1.20135,1.08845 0.38312,0.38311 0.74593,0.78272 1.08845,1.20135 0.34379,0.41863 0.66601,0.85249 0.96666,1.30157 0.30066,0.45034 0.57848,0.91338 0.83346,1.39037 0.25499,0.47699 0.48587,0.96539 0.69392,1.46522 0.20678,0.49981 0.38819,1.00852 0.54549,1.5261 0.1573,0.51758 0.28924,1.04151 0.39453,1.57305 0.10529,0.53027 0.18521,1.06434 0.23723,1.60349 0.0533,0.53788 0.0799,1.07703 0.0799,1.61871 0,0.54042 -0.0266,1.08084 -0.0799,1.61872 -0.052,0.53788 -0.13194,1.07322 -0.23723,1.60349 -0.10529,0.53027 -0.23723,1.05419 -0.39453,1.57178 -0.1573,0.51758 -0.33871,1.02628 -0.54549,1.5261 -0.20805,0.49983 -0.43893,0.98823 -0.69392,1.46522 -0.25498,0.47699 -0.5328,0.94129 -0.83346,1.39037 -0.30065,0.45035 -0.62287,0.88421 -0.96666,1.30284 -0.34252,0.41737 -0.70533,0.81824 -1.08845,1.20008 -0.38311,0.38311 -0.78398,0.74593 -1.20135,1.08845 -0.41863,0.34378 -0.85249,0.666 -1.30283,0.96539 -0.45035,0.30065 -0.91338,0.57848 -1.39164,0.83346 -0.47699,0.25499 -0.96539,0.48587 -1.46522,0.69391 -0.49982,0.20678 -1.00852,0.38819 -1.52737,0.5455 -0.51759,0.1573 -1.04151,0.28796 -1.57305,0.39453 -0.53027,0.10529 -1.06561,0.18394 -1.60349,0.23722 -0.53915,0.0533 -1.0783,0.0799 -1.61998,0.0799 -0.54169,-10e-4 -1.08084,-0.0279 -1.61872,-0.0812 -0.53915,-0.0533 -1.07322,-0.1332 -1.60349,-0.23976 -0.53154,-0.10529 -1.05547,-0.23722 -1.57305,-0.39453 -0.51758,-0.1573 -1.02628,-0.33998 -1.52611,-0.54676 -0.49982,-0.20805 -0.98822,-0.43893 -1.46521,-0.69391 -0.47699,-0.25499 -0.94003,-0.53281 -1.39037,-0.83346 -0.45035,-0.30066 -0.88421,-0.62288 -1.30157,-0.9654 -0.41863,-0.34252 -0.8195,-0.70533 -1.20135,-1.08844 -0.38311,-0.38185 -0.74593,-0.78272 -1.08971,-1.20009 -0.34252,-0.41863 -0.66474,-0.85249 -0.9654,-1.30156 -0.30192,-0.44908 -0.57974,-0.91212 -0.83472,-1.38911 -0.25499,-0.47699 -0.48714,-0.96539 -0.69392,-1.46521 -0.20805,-0.49982 -0.38946,-1.00726 -0.54676,-1.52484 -0.15858,-0.51758 -0.29051,-1.04151 -0.3958,-1.57178 -0.10656,-0.53027 -0.18648,-1.06434 -0.23976,-1.60222 -0.0533,-0.53915 -0.0812,-1.0783 -0.0812,-1.61872 z m 0,0"
					fill-opacity="1"
					fill-rule="nonzero"
					id="path131503"
					style="fill:#5e17eb;fill-opacity:1;stroke-width:0.324758"
				/>
				<g
					clip-path="url(#c632f4d2a7)"
					id="g131507"
					transform="matrix(0.32475783,0,0,0.32475783,92.63423,183.90688)"
					style="fill:#5e17eb;fill-opacity:1"
				>
					<path
						fill="#8c52ff"
						d="m 185.63672,294.08594 c 2.72265,0 5.4375,-0.17188 8.14062,-0.51563 2.70313,-0.34375 5.3711,-0.85547 8.01172,-1.53515 2.63672,-0.67969 5.22266,-1.52344 7.75391,-2.53125 2.53125,-1.00782 4.98828,-2.16797 7.37109,-3.48438 2.38672,-1.31641 4.67578,-2.78125 6.87891,-4.38672 2.19922,-1.60547 4.28906,-3.34375 6.26562,-5.21484 1.98047,-1.8711 3.83594,-3.85938 5.5625,-5.96485 1.73047,-2.10546 3.32032,-4.30859 4.76953,-6.61328 l 2.85157,1.79297 c 1.125,-1.78906 2.16406,-3.6289 3.11718,-5.51562 0.95313,-1.88282 1.81641,-3.8125 2.58985,-5.77735 0.77734,-1.96875 1.45703,-3.96484 2.04297,-5.99609 0.58984,-2.03125 1.07812,-4.08203 1.47656,-6.16016 0.39453,-2.07422 0.69531,-4.16406 0.89453,-6.26953 0.20313,-2.10156 0.30469,-4.21094 0.30859,-6.32422 0.004,-2.11328 -0.0898,-4.22265 -0.28125,-6.32812 -0.1914,-2.10547 -0.48046,-4.19531 -0.87109,-6.27344 -0.38672,-2.07812 -0.86719,-4.13281 -1.44922,-6.16406 -0.57812,-2.03516 -1.25,-4.03516 -2.01562,-6.00391 -0.76563,-1.97265 -1.6211,-3.90234 -2.56641,-5.79297 -0.94531,-1.88672 -1.97656,-3.73047 -3.09375,-5.52343 -1.11719,-1.79688 -2.31641,-3.53516 -3.59766,-5.21485 -1.27734,-1.68359 -2.63281,-3.30469 -4.0664,-4.85937 -1.42969,-1.55469 -2.92969,-3.04297 -4.5,-4.45703 -1.56641,-1.41797 -3.19922,-2.75782 -4.89453,-4.02344 l -2.01953,2.69922 c -2.76954,-2.07813 -5.6875,-3.91797 -8.75782,-5.52344 -3.07031,-1.60156 -6.24609,-2.94922 -9.53515,-4.03906 -3.28907,-1.08594 -6.64063,-1.90625 -10.0625,-2.44922 -3.41797,-0.54688 -6.85938,-0.8125 -10.32422,-0.80078 -1.45703,0 -2.91797,0.0547 -4.36719,0.15234 L 286.06641,60.226562 h 124.89453 v 5.445313 h 12.44531 V 53.226562 h -12.44531 v 5.957032 H 285.64062 L 179.67578,165.10156 c -8.36719,0.76953 -16.28125,3.08203 -23.74609,6.9336 l -1.55469,-2.9961 c -2.75781,1.42578 -5.41016,3.03125 -7.94531,4.81641 -2.53907,1.78906 -4.94532,3.74219 -7.21485,5.85937 -2.27343,2.11719 -4.39062,4.37891 -6.35156,6.78516 -1.96094,2.40625 -3.74609,4.93359 -5.35937,7.58594 -1.61719,2.65234 -3.04297,5.40234 -4.27735,8.24609 -1.23828,2.84766 -2.27343,5.76563 -3.11328,8.75391 -0.83594,2.99218 -1.46484,6.02343 -1.88672,9.09765 -0.41797,3.07422 -0.6289,6.16407 -0.625,9.26953 h 3.3711 c -0.0156,5.02735 0.55468,9.99219 1.71093,14.88672 1.15625,4.89453 2.86719,9.58594 5.13282,14.07813 3.22656,6.42578 7.41406,12.15234 12.55468,17.18359 l -2.36328,2.40235 c 3.47266,3.39843 7.26953,6.39453 11.38281,8.98828 4.11329,2.58984 8.45313,4.71875 13.01954,6.38672 7.5039,2.72265 15.25,4.08203 23.23437,4.07031 z m 0,-4.40625 c -7.07031,0.008 -13.92969,-1.19141 -20.57422,-3.60157 -4.04688,-1.47656 -7.89453,-3.36328 -11.54297,-5.65625 -3.64453,-2.29687 -7.00781,-4.94921 -10.08984,-7.95703 l -2.36328,2.40235 c -5.05079,-4.95313 -9.16016,-10.58985 -12.32813,-16.91407 -2.23047,-4.41796 -3.91015,-9.03906 -5.04687,-13.85546 -1.14063,-4.81641 -1.69922,-9.69532 -1.6836,-14.64454 h 3.3711 c 0.004,-2.75 0.1914,-5.48437 0.5664,-8.20703 0.375,-2.72265 0.9336,-5.41015 1.67969,-8.05468 0.74219,-2.64454 1.66016,-5.23047 2.75781,-7.75 1.09766,-2.51954 2.35938,-4.95704 3.78906,-7.30469 1.42969,-2.34766 3.01172,-4.58594 4.7461,-6.71875 1.73828,-2.13281 3.60937,-4.13672 5.62109,-6.01172 2.00781,-1.875 4.13672,-3.60547 6.38281,-5.19141 2.25,-1.58203 4.59375,-3.00781 7.03516,-4.27343 l -1.55469,-2.99219 c 2.63672,-1.36328 5.35938,-2.53516 8.16407,-3.51953 2.80078,-0.98047 5.66015,-1.76172 8.57421,-2.34375 2.91016,-0.58203 5.85157,-0.95703 8.81641,-1.12891 2.96484,-0.17187 5.92969,-0.13672 8.88672,0.10938 2.96094,0.24218 5.89062,0.6914 8.78906,1.34375 2.89844,0.65234 5.73438,1.5039 8.51563,2.55468 2.77734,1.05078 5.46875,2.28907 8.07422,3.71485 2.60546,1.42578 5.09765,3.02734 7.47656,4.80078 l -2.01563,2.69922 c 4.67188,3.49218 8.75391,7.57422 12.25,12.24609 0.90235,1.20703 1.75782,2.44922 2.56641,3.72266 0.80859,1.27343 1.57031,2.57812 2.28125,3.91015 0.71094,1.32813 1.37109,2.6836 1.98047,4.06641 0.60937,1.37891 1.16797,2.78125 1.67187,4.20312 0.50391,1.42188 0.95313,2.86329 1.34766,4.32032 0.39844,1.45312 0.73828,2.92187 1.02344,4.40625 0.28515,1.48047 0.51562,2.97265 0.6875,4.46875 0.17578,1.5 0.29297,3.0039 0.35156,4.51172 0.0625,1.50781 0.0664,3.01562 0.0117,4.52343 -0.0508,1.50782 -0.16016,3.01172 -0.32813,4.51172 -0.16406,1.5 -0.38672,2.99219 -0.66406,4.47656 -0.27734,1.48047 -0.61328,2.95313 -1,4.41016 -0.39062,1.46094 -0.83203,2.90234 -1.32812,4.32422 -0.4961,1.42578 -1.04688,2.83203 -1.64844,4.21484 -0.60156,1.38282 -1.25781,2.74219 -1.96094,4.07813 -0.70312,1.33203 -1.45703,2.64062 -2.26172,3.91797 l 2.85156,1.79297 c -1.42578,2.26953 -2.98828,4.4375 -4.6914,6.50781 -1.69922,2.07031 -3.52344,4.02734 -5.47266,5.86719 -1.94922,1.83984 -4.0039,3.54687 -6.16797,5.1289 -2.16406,1.58203 -4.42187,3.01953 -6.76562,4.3125 -2.34766,1.29688 -4.76563,2.4375 -7.25391,3.42969 -2.49219,0.98828 -5.03515,1.82031 -7.6289,2.48828 -2.59766,0.66797 -5.22266,1.17188 -7.88282,1.51172 -2.65625,0.33594 -5.32812,0.50391 -8.00781,0.50391 z m 0,0"
						fill-opacity="1"
						fill-rule="nonzero"
						id="path131505"
						style="fill:#5e17eb;fill-opacity:1"
					/>
				</g>
			</g>
			<g
				clip-path="url(#9989cfe438-7)"
				id="g161575"
				transform="matrix(0.33854635,0,0,0.66636812,481.48891,-32.245286)"
				style="fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:10;stroke-dasharray:none"
			>
				<path
					fill="#8c52ff"
					d="M 82.226562,353.98047 H 361.77344 l 18.65625,18.61719 v 141.6875 l -18.65625,18.61328 H 82.226562 l -18.65625,-18.61328 v -141.6875 z m 0,0"
					fill-opacity="0.4"
					fill-rule="nonzero"
					id="path161573"
					style="fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:10;stroke-dasharray:none"
				/>
			</g>
			<path
				fill="#8c52ff"
				d="m 501.80169,243.37862 h 2.01541 l 2.82474,5.56523 v 29.40869 l -2.82474,5.56261 h -2.01541 z m 0,0"
				fill-opacity="1"
				fill-rule="nonzero"
				id="path161577"
				style="fill:#5e17eb;fill-opacity:1;stroke-width:0.474971"
			/>
			<path
				fill="#8c52ff"
				d="m 611.4907,243.37862 h -2.01541 l -2.82474,5.56523 v 29.40869 l 2.82474,5.56261 h 2.01541 z m 0,0"
				fill-opacity="1"
				fill-rule="nonzero"
				id="path161579"
				style="fill:#5e17eb;fill-opacity:1;stroke-width:0.474971"
			/>
			<g
				clip-path="url(#9989cfe438-7-7)"
				id="g161575-1"
				transform="matrix(0.4206686,0,0,0.29237246,476.56157,241.98521)"
				style="fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:10;stroke-dasharray:none"
			>
				<path
					fill="#8c52ff"
					d="M 82.226562,353.98047 H 361.77344 l 18.65625,18.61719 v 141.6875 l -18.65625,18.61328 H 82.226562 l -18.65625,-18.61328 v -141.6875 z m 0,0"
					fill-opacity="0.4"
					fill-rule="nonzero"
					id="path161573-0"
					style="fill:#e6e6e6;fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:10;stroke-dasharray:none"
				/>
			</g>
			<path
				fill="#8c52ff"
				d="m 501.80168,362.91663 h 2.5043 l 3.50995,2.44177 v 12.90322 l -3.50995,2.44062 h -2.5043 z m 0,0"
				fill-opacity="1"
				fill-rule="nonzero"
				id="path161577-7"
				style="fill:#5e17eb;fill-opacity:1;stroke-width:0.350703"
			/>
			<path
				fill="#8c52ff"
				d="m 638.09831,362.91663 h -2.50429 l -3.50996,2.44177 v 12.90322 l 3.50996,2.44062 h 2.50429 z m 0,0"
				fill-opacity="1"
				fill-rule="nonzero"
				id="path161579-6"
				style="fill:#5e17eb;fill-opacity:1;stroke-width:0.350703"
			/>
			<circle
				style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1;stop-color:#000000"
				id="path211469"
				cx="172.3764"
				cy="258.45596"
				r="16.125"
			/>
			<text
				xml:space="preserve"
				style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:144px;line-height:1.25;font-family:'Accanthis ADF Std No2';-inkscape-font-specification:'Accanthis ADF Std No2';letter-spacing:0px;word-spacing:0px;stroke-width:0.75"
				x="-76.8004"
				y="231.13922"
				id="text219861"
				><tspan
					sodipodi:role="line"
					id="tspan219859"
					style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-family:'Accanthis ADF Std No2';-inkscape-font-specification:'Accanthis ADF Std No2';stroke-width:0.75"
					x="-76.8004"
					y="231.13922"
				/></text
			>
		</g>
		<g
			inkscape:groupmode="layer"
			id="layer6"
			inkscape:label="temp/rem"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		/>
		<g
			inkscape:groupmode="layer"
			id="layer5"
			inkscape:label="text"
			style="display:inline"
			transform="translate(-109.7124,-192.69727)"
		>
			<g
				aria-label="MINT "
				id="text108445"
				style="font-size:8px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;display:inline;fill:#ffffff;stroke-width:0.75"
			>
				<path
					d="m 511.40411,213.99387 0.82032,-0.004 0.004,-4.68359 H 512.58 l -0.004,0.11328 0.58984,2.23047 3.04297,-0.004 0.004,1.17187 1.16797,0.004 v -1.17187 l 0.12109,-0.004 0.58594,-2.22656 v -0.11719 h 0.34765 v 4.6875 h 0.82422 l -0.004,-0.11719 0.46875,-0.46875 h 0.11718 v -4.6875 l -0.11718,0.004 -0.46875,-0.47266 v -0.11719 h -1.875 v 0.11719 l -0.52735,2.11328 v 0.11328 l -3.04687,0.004 v -0.12109 l -0.52735,-2.10547 v -0.11719 l -1.875,-0.004 0.004,0.1211 -0.47266,0.46484 h -0.11328 l -0.004,4.69141 h 0.11718 l 0.46875,0.46484 z"
					id="path189916"
				/>
				<path
					d="m 520.93536,213.99387 7.85547,-0.004 v -0.11719 l 0.46875,-0.46875 h 0.11328 v -0.58594 h -2.34375 v -3.51562 l 2.34375,0.004 v -0.58985 h -0.11328 l -0.47265,-0.46875 v -0.11719 h -7.85157 l 0.004,0.11719 -0.47266,0.47266 -0.11328,-0.004 -0.004,0.58594 h 5.27343 v 3.51953 h -5.27343 v 0.58594 l 0.12109,-0.004 0.46484,0.46875 z"
					id="path189918"
				/>
				<path
					d="m 530.46661,213.99387 0.82032,-0.004 0.004,-4.68359 h 0.35157 l -0.004,0.11328 0.58984,1.05468 h 3.04297 l 0.004,1.76172 0.11328,-0.004 0.9375,1.64062 v 0.11719 h 1.99609 l -0.004,-0.11328 0.46875,-0.46875 0.11718,-0.004 v -4.6875 h -0.11328 l -0.47265,-0.46875 v -0.11719 h -0.82032 v 4.6875 l -0.35156,0.004 0.004,-0.11719 -0.58985,-1.05468 -0.11328,-0.004 v -1.75781 l -3.05078,0.004 -0.9375,-1.64062 v -0.11719 l -1.99219,-0.004 0.004,0.1211 -0.47266,0.46875 -0.11328,-0.004 -0.004,4.69141 h 0.11718 l 0.46875,0.46875 z"
					id="path189920"
				/>
				<path
					d="m 544.6463,213.99387 1.40235,-0.004 0.004,-4.6875 2.34375,0.004 v -0.58985 h -0.11719 l -0.46875,-0.46875 v -0.11719 h -7.85156 v 0.11719 l -0.46875,0.46875 h -0.11719 v 0.58594 h 5.27344 z"
					id="path189922"
				/>
			</g>
			<g
				aria-label="SATOSHI "
				id="text108445-8"
				style="font-size:12px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;display:inline;fill:#ffffff;stroke-width:0.75"
			>
				<path
					d="m 531.81024,377.61954 0.006,-0.17578 0.69727,-0.70899 0.17578,0.006 v -2.63672 h -0.17578 l -2.63672,-1.58203 -0.006,-0.17578 -7.02539,-0.006 v -0.17578 l -1.40039,-1.14258 h -0.18164 v -0.43945 h 9.3164 l 0.006,0.18164 1.92774,1.57617 h 0.17578 v -2.63672 h -0.18164 l -0.69727,-0.70312 v -0.16993 l -11.77734,-0.006 v 0.17578 l -0.70313,0.70312 h -0.17578 v 2.63672 h 0.17578 l 2.63086,1.58203 0.006,0.18164 7.02539,-0.006 0.006,0.17578 1.40039,1.14844 0.18164,-0.006 v 0.43946 h -9.32226 l 0.006,-0.17579 -1.9336,-1.58203 h -0.17578 v 2.63672 h 0.17578 l 0.70313,0.70899 v 0.16992 z"
					id="path189890"
				/>
				<path
					d="m 546.2829,377.61368 -0.006,-0.16992 0.71484,-0.70899 h 0.16992 v -5.27344 h -0.17578 l -2.63672,-2.45507 v -0.18164 h -7.91015 v 0.18164 l -2.64258,2.46093 -0.16992,-0.006 v 5.27344 h 0.17578 l 0.70312,0.70899 v 0.16992 h 1.23047 v -2.63672 h 6.67969 v -1.75781 h -6.67969 v -0.87891 l 0.16992,0.006 1.41211,-1.58203 v -0.18164 h 6.15235 v 0.17578 l 1.40625,1.58789 0.17578,-0.006 v 0.87891 h -2.28516 v 1.75781 h 2.28516 v 2.63672 z"
					id="path189892"
				/>
				<path
					d="m 555.18915,377.61954 2.10351,-0.006 0.006,-7.03125 3.51563,0.006 v -0.88477 h -0.17578 l -0.70313,-0.70312 v -0.17578 H 548.1579 v 0.17578 l -0.70313,0.70312 h -0.17578 v 0.87891 h 7.91016 z"
					id="path189894"
				/>
				<path
					d="m 570.66376,377.61954 3.50976,-0.006 v -0.16992 l 0.70899,-0.70899 0.16992,0.006 v -7.03711 l -0.17578,0.006 -0.70313,-0.70898 v -0.16993 l -11.77734,-0.006 v 0.18164 l -0.69727,0.70312 -0.18164,-0.006 v 7.03125 l 0.18164,0.006 0.70313,0.69727 -0.006,0.18164 7.91016,-0.006 v -1.75781 h -6.67969 v -5.27344 h 9.3164 v 5.27344 h -2.28515 z"
					id="path189896"
				/>
				<path
					d="m 588.64618,377.61954 0.006,-0.17578 0.69726,-0.70899 0.17579,0.006 v -2.63672 h -0.17579 l -2.63671,-1.58203 -0.006,-0.17578 -7.02539,-0.006 v -0.17578 l -1.4004,-1.14258 h -0.18164 v -0.43945 h 9.31641 l 0.006,0.18164 1.92773,1.57617 h 0.17579 v -2.63672 h -0.18165 l -0.69726,-0.70312 v -0.16993 l -11.77734,-0.006 v 0.17578 l -0.70313,0.70312 h -0.17578 v 2.63672 h 0.17578 l 2.63086,1.58203 0.006,0.18164 7.02539,-0.006 0.006,0.17578 1.40039,1.14844 0.18164,-0.006 v 0.43946 h -9.32227 l 0.006,-0.17579 -1.93359,-1.58203 h -0.17578 v 2.63672 h 0.17578 l 0.70313,0.70899 v 0.16992 z"
					id="path189898"
				/>
				<path
					d="m 591.34149,377.61954 1.23047,-0.006 0.006,-3.50977 9.31055,-0.006 v 3.51563 h 1.23632 l -0.0117,-0.17578 0.70898,-0.69727 0.17578,-0.006 v -7.03125 h -0.16992 l -0.70313,-0.70312 -0.006,-0.17578 h -1.23047 v 3.51562 l -9.31641,0.006 v -3.51563 l -1.23047,-0.006 v 0.18164 l -0.69726,0.70312 -0.17579,-0.006 -0.006,7.03711 0.18164,-0.006 0.70312,0.70899 z"
					id="path189900"
				/>
				<path
					d="m 605.63837,377.61954 11.7832,-0.006 v -0.17578 l 0.70312,-0.70313 h 0.16993 v -0.8789 h -3.51563 v -5.27344 l 3.51563,0.006 v -0.88477 h -0.16993 l -0.70898,-0.70312 v -0.17578 h -11.77734 l 0.006,0.17578 -0.70899,0.70898 -0.16992,-0.006 -0.006,0.87891 h 7.91016 v 5.27929 h -7.91016 v 0.87891 l 0.18164,-0.006 0.69727,0.70313 z"
					id="path189902"
				/>
			</g>
			<g
				aria-label="Cashu"
				id="text31792"
				style="font-size:25px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;fill:#5e17eb;stroke-width:0.75"
			>
				<path
					d="m 440.63617,426.04089 24.53613,-0.0122 v -0.36621 l 1.45264,-1.45264 h 0.37842 v -5.49317 l -0.35401,-0.0122 -4.05273,3.3081 0.0122,0.35401 h -19.40918 v -10.98633 h 19.40918 l 0.0122,2.75879 4.38233,-0.0122 v -4.57764 h -0.35401 l -1.47705,-1.46484 v -0.354 l -24.53613,-0.0122 -0.0122,0.36621 -1.45263,1.46484 h -0.36622 v 14.64844 h 0.35401 l 1.47705,1.47705 z"
					id="path189905"
				/>
				<path
					d="m 495.32367,426.02869 -0.0122,-0.35401 1.48926,-1.47705 h 0.354 V 413.2113 h -0.36621 l -5.49316,-5.11474 v -0.37842 h -16.47949 v 0.37842 l -5.50537,5.12695 -0.35401,-0.0122 v 10.98633 h 0.36621 l 1.46485,1.47705 v 0.35401 h 2.56347 v -5.49317 h 13.91602 v -3.66211 h -13.91602 v -1.83105 l 0.35401,0.0122 2.94189,-3.2959 v -0.37842 h 12.81738 v 0.36621 l 2.92969,3.30811 0.36621,-0.0122 v 1.83105 h -4.76074 v 3.66211 h 4.76074 v 5.49317 z"
					id="path189907"
				/>
				<path
					d="m 525.47504,426.04089 0.0122,-0.36621 1.45264,-1.47705 0.36621,0.0122 v -5.49317 h -0.36621 l -5.49316,-3.29589 -0.0122,-0.36621 -14.63623,-0.0122 v -0.36621 l -2.91748,-2.38037 h -0.37842 v -0.91553 h 19.40918 l 0.0122,0.37842 4.01611,3.28369 h 0.36621 v -5.49317 h -0.37842 l -1.45263,-1.46484 v -0.354 l -24.53614,-0.0122 v 0.36621 l -1.46484,1.46484 h -0.36621 v 5.49317 h 0.36621 l 5.48096,3.2959 0.0122,0.37841 14.63623,-0.0122 0.0122,0.36621 2.91748,2.39258 0.37842,-0.0122 v 0.91553 h -19.42139 l 0.0122,-0.36621 -4.02832,-3.2959 h -0.36621 v 5.49316 h 0.36621 l 1.46484,1.47705 v 0.35401 z"
					id="path189909"
				/>
				<path
					d="m 531.09027,426.04089 2.56348,-0.0122 0.0122,-7.31202 19.39698,-0.0122 v 7.32422 h 2.57568 l -0.0244,-0.36621 1.47705,-1.45264 0.36621,-0.0122 V 409.5492 h -0.35401 l -1.46484,-1.46484 -0.0122,-0.36621 h -2.56347 v 7.32422 l -19.40918,0.0122 v -7.32422 l -2.56348,-0.0122 v 0.37842 l -1.45264,1.46484 -0.36621,-0.0122 -0.0122,14.66065 0.37841,-0.0122 1.46485,1.47705 z"
					id="path189911"
				/>
				<path
					d="m 561.24164,426.04089 24.53613,-0.0122 -0.0122,-0.36621 1.47705,-1.46485 0.36622,0.0122 v -14.66065 l -0.36622,0.0122 -1.47705,-1.46484 0.0122,-0.36621 h -2.56348 v 14.63623 l -19.40918,0.0122 v -14.64843 l -2.56347,-0.0122 0.0122,0.36621 -1.47706,1.47705 h -0.36621 v 14.64844 h 0.36621 l 1.46485,1.46484 z"
					id="path189913"
				/>
			</g>
		</g>
		<text
			xml:space="preserve"
			style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:12px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;stroke-width:0.75"
			x="50.595047"
			y="71.644394"
			id="text22634"
			><tspan
				sodipodi:role="line"
				id="tspan22632"
				style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:12px;font-family:'Super Car';-inkscape-font-specification:'Super Car';stroke-width:0.75"
				x="50.595047"
				y="71.644394"
			/></text
		>
		<text
			xml:space="preserve"
			transform="scale(0.75)"
			id="text53376"
			style="font-size:14.6667px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;white-space:pre;shape-inside:url(#rect53378)"
		/>
		<text
			xml:space="preserve"
			transform="scale(0.75)"
			id="text74700"
			style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:8px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;white-space:pre;shape-inside:url(#rect74702)"
			><tspan x="536.59375" y="39.804788" id="tspan337689">{mintUrlChunks[0] ?? ''}</tspan><tspan
				x="536.59375"
				y="49.804788"
				id="tspan337691">{mintUrlChunks[1] ?? ''}</tspan
			><tspan x="536.59375" y="59.804788" id="tspan337693">{mintUrlChunks[2] ?? ''}</tspan><tspan
				x="536.59375"
				y="69.804788"
				id="tspan337695">{mintUrlChunks[3] ?? ''}</tspan
			><tspan x="536.59375" y="79.804788" id="tspan337697">{mintUrlChunks[4] ?? ''}</tspan><tspan
				x="536.59375"
				y="89.804788"
				id="tspan337699">{mintUrlChunks[5] ?? ''}</tspan
			><tspan x="536.59375" y="99.804788" id="tspan337701">{mintUrlChunks[6] ?? ''}</tspan></text
		>
		<image
			width="191.25"
			height="191.25"
			preserveAspectRatio="none"
			xlink:href={imageURL}
			id="image212534"
			x="114.22494"
			y="25.308861"
		/>
		<text
			xml:space="preserve"
			transform="scale(0.75)"
			id="text263301"
			style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:14.6667px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;white-space:pre;shape-inside:url(#rect263303)"
		/>
		<text
			xml:space="preserve"
			transform="scale(0.75)"
			id="text302489"
			style="font-size:14.6667px;line-height:0.5;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;white-space:pre;shape-inside:url(#rect302491)"
		/>
		<text
			xml:space="preserve"
			transform="matrix(0.75,0,0,0.75,3.2928026,14.269043)"
			id="text317015"
			style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:14.6667px;line-height:1.25;font-family:'Super Car';-inkscape-font-specification:'Super Car';letter-spacing:0px;word-spacing:0px;white-space:pre;shape-inside:url(#rect317017)"
			><tspan x="63.310547" y="73.866102" id="tspan337703">{denomination}</tspan></text
		>
	</svg>
</button>