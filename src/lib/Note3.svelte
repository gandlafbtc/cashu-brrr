<script lang="ts">
	import { onMount } from 'svelte';
	import { QRCodeImage } from 'svelte-qrcode-image';

	export let denomination: number;
	export let mintUrl: string;
	export let token: string;

	$: imageURL = '';

	let mintUrlChunks = Array<string>();

	mintUrlChunks = mintUrl.match(/(.{1,20})/g) ?? [];

	onMount(() => {
			imageURL = document.getElementById('qr-' + token).toDataURL();
	});

	const downloadNote = async (e) => {
		const svg = e.target.nearestViewportElement;
		const xml = new XMLSerializer().serializeToString(svg);
		const svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
		var a = document.createElement('a'); //Create <a>
		a.href = 'data:image/svg+xml;base64,' + svg64; //Image Base64 Goes here
		a.download = 'Image.svg'; //File name Here
		a.click(); //Downloaded file
	};
</script>

<div class="invisible h-0">
	<QRCodeImage text={token} scale={9} displayType="canvas" displayID="qr-{token}" />
</div>

<svg
   width="160mm"
   height="64mm"
   viewBox="0 0 160 64"
   version="1.1"
   id="svg5"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg">
  <defs
     id="defs2">
    <rect
       x="53.311199"
       y="60.166668"
       width="53.012589"
       height="50.610092"
       id="rect317017" />
    <rect
       x="65.951309"
       y="67.349358"
       width="39.755798"
       height="34.15897"
       id="rect302491" />
    <rect
       x="65.264893"
       y="68.544304"
       width="40.442215"
       height="32.964024"
       id="rect263303" />
    <rect
       x="536.59357"
       y="32.331081"
       width="108.2624"
       height="124.25225"
       id="rect74702" />
    <rect
       x="546.56891"
       y="47.825466"
       width="106.64782"
       height="113.67164"
       id="rect53378" />
    <clipPath
       id="3f610dd0ff">
      <path
         d="M 15.421875,179.26562 H 794.85547 V 509.19141 H 15.421875 Z m 0,0"
         clip-rule="nonzero"
         id="path2" />
    </clipPath>
    <clipPath
       id="b41faa365e">
      <path
         d="m 611,323 h 30.95312 v 81 H 611 Z m 0,0"
         clip-rule="nonzero"
         id="path5" />
    </clipPath>
    <clipPath
       id="9ba27fb232">
      <path
         d="m 640.72266,403.76172 -9.39454,-0.13672 c 0.26172,-0.95313 0.33204,-2.01172 -0.125,-3.14844 -0.18359,-0.42969 -0.40234,-0.80859 -0.67187,-1.13672 l 10.08984,-21.51953 0.0586,14.41406 c -0.15235,-0.043 -0.3125,-0.0781 -0.47266,-0.11718 -0.51172,-0.0937 -0.98437,-0.14453 -1.42969,-0.14453 -6.57031,0 -6.55468,10.01953 -0.85937,10.54296 0.3125,0.0312 0.61328,0.0469 0.90234,0.0469 0.69922,0 1.32813,-0.082 1.89453,-0.22656 l 0.008,1.42578 m -26.65235,-5.12891 c -0.1875,0 -0.38672,-0.0195 -0.59765,-0.0664 l 0.41015,-70.27344 -2.24609,-4.58203 29.6914,0.20312 c 0,0 -0.28515,21.11719 -0.48828,21.11719 -0.008,0 -0.0156,-0.0234 -0.0156,-0.0664 -0.21094,-1.42187 -8.44141,-19.82812 -8.44141,-19.82812 l -10.57812,0.40234 0.61328,35.29688 9.45312,-10.07032 -0.30468,21.96875 -8.84375,-9.86328 -0.0547,22.31641 c -0.6211,-0.28125 -1.27735,-0.41406 -1.9336,-0.41406 -3.45703,0 -6.91015,3.63672 -4.55078,7.80468 1.36328,2.41797 0.26953,6.05469 -2.11328,6.05469"
         clip-rule="nonzero"
         id="path8" />
    </clipPath>
    <clipPath
       id="c13de10a5c">
      <path
         d="m 170.19141,262 h 141.71484 v 16 H 170.19141 Z m 0,0"
         clip-rule="nonzero"
         id="path11" />
    </clipPath>
    <clipPath
       id="5ede4b21f2">
      <path
         d="m 310.76953,277.625 c 0,0 -140.00391,0 -140.41016,-0.60938 -0.41015,-0.60546 0.30469,-5.23437 0.30469,-5.23437 0,0 19.38281,-0.0273 43.75391,-0.0273 41.20703,0 96.66406,0.0664 96.76172,0.3789 0.15234,0.50781 -0.41016,5.49219 -0.41016,5.49219 m -52.03516,-9.12109 c -5.66015,0 -10.42187,-0.0234 -12.83593,-0.082 -8.63672,-0.20312 -59.42969,0.0508 -59.67578,-0.91796 -0.25391,-0.96875 -1.07032,-4.83204 -0.50782,-5.39063 0.74219,-0.0312 4.21485,-0.043 9.48828,-0.043 26.32422,0 97.58204,0.34766 99.19141,0.34766 1.9375,0 2.64453,5.39453 0.81641,5.69922 -1.31641,0.21875 -21.8711,0.38672 -36.47657,0.38672"
         clip-rule="nonzero"
         id="path14" />
    </clipPath>
    <clipPath
       id="65456aac5f">
      <path
         d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
         clip-rule="nonzero"
         id="path4588" />
    </clipPath>
    <clipPath
       id="69488bb349">
      <path
         d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4591" />
    </clipPath>
    <clipPath
       id="b46a85b818">
      <path
         d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4594" />
    </clipPath>
    <clipPath
       id="931287b357">
      <path
         d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4597" />
    </clipPath>
    <clipPath
       id="9f8d5c6b67">
      <path
         d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4600" />
    </clipPath>
    <clipPath
       id="a131c9c548">
      <path
         d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4603" />
    </clipPath>
    <clipPath
       id="57e398e083">
      <path
         d="M 395.26172,483.99609 H 587 v 24 H 395.26172 Z m 0,0"
         clip-rule="nonzero"
         id="path4606" />
    </clipPath>
    <clipPath
       id="a3a57048de">
      <path
         d="m 492,483.99609 h 82 v 24 h -82 z m 0,0"
         clip-rule="nonzero"
         id="path4609" />
    </clipPath>
    <clipPath
       id="ca3eef3423">
      <path
         d="m 528,483.99609 h 191.26172 v 24 H 528 Z m 0,0"
         clip-rule="nonzero"
         id="path4612" />
    </clipPath>
    <clipPath
       id="c053e953b7">
      <path
         d="m 540,483.99609 h 82 v 24 h -82 z m 0,0"
         clip-rule="nonzero"
         id="path4615" />
    </clipPath>
    <clipPath
       id="cdbbe4d932">
      <path
         d="m 519,500 h 77 v 7.99609 h -77 z m 0,0"
         clip-rule="nonzero"
         id="path4618" />
    </clipPath>
    <clipPath
       id="d577bb0800">
      <path
         d="M 395.26172,483.99609 H 428 V 493 h -32.73828 z m 0,0"
         clip-rule="nonzero"
         id="path4621" />
    </clipPath>
    <clipPath
       id="1dc0c06ae7">
      <path
         d="m 687,483.99609 h 32 V 493 h -32 z m 0,0"
         clip-rule="nonzero"
         id="path4624" />
    </clipPath>
    <clipPath
       id="559917cdd0">
      <path
         d="M 400.67187,624 H 409 v 8 h -8.32813 z m 0,0"
         clip-rule="nonzero"
         id="path4627" />
    </clipPath>
    <clipPath
       id="829968d102">
      <path
         d="m 717,620 h 7.67187 v 9 H 717 Z m 0,0"
         clip-rule="nonzero"
         id="path4630" />
    </clipPath>
    <clipPath
       id="c75814b0b6">
      <path
         d="M 400.67187,617.78125 H 579 V 645 H 400.67187 Z m 0,0"
         clip-rule="nonzero"
         id="path4633" />
    </clipPath>
    <clipPath
       id="d1610683e1">
      <path
         d="m 421,617.78125 h 200 v 32.25 H 421 Z m 0,0"
         clip-rule="nonzero"
         id="path4636" />
    </clipPath>
    <clipPath
       id="0046011bd7">
      <path
         d="M 532,617.78125 H 724.67187 V 647 H 532 Z m 0,0"
         clip-rule="nonzero"
         id="path4639" />
    </clipPath>
    <clipPath
       id="4f04b9701d">
      <path
         d="M 587,617.78125 H 717 V 641 H 587 Z m 0,0"
         clip-rule="nonzero"
         id="path4642" />
    </clipPath>
    <clipPath
       id="18617e2d62">
      <path
         d="m 568,620 h 152 v 30.03125 H 568 Z m 0,0"
         clip-rule="nonzero"
         id="path4645" />
    </clipPath>
    <clipPath
       id="be1d3e8250">
      <path
         d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0"
         clip-rule="nonzero"
         id="path4648" />
    </clipPath>
    <clipPath
       id="42d7fac3ef">
      <path
         d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4651" />
    </clipPath>
    <clipPath
       id="f0bbbbc5b0">
      <path
         d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4654" />
    </clipPath>
    <clipPath
       id="03ff9b82e1">
      <path
         d="M 170,81 H 400.67187 V 195 H 170 Z m 0,0"
         clip-rule="nonzero"
         id="path4657" />
    </clipPath>
    <clipPath
       id="191bbfb93e">
      <path
         d="M 42.476562,396 H 363 v 50.86328 H 42.476562 Z m 0,0"
         clip-rule="nonzero"
         id="path4660" />
    </clipPath>
    <clipPath
       id="aa6223acfd">
      <path
         d="m 347,388.36328 h 19.47656 V 408 H 347 Z m 0,0"
         clip-rule="nonzero"
         id="path4663" />
    </clipPath>
    <clipPath
       id="65456aac5f-9">
      <path
         d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
         clip-rule="nonzero"
         id="path4588-6" />
    </clipPath>
    <clipPath
       id="69488bb349-1">
      <path
         d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4591-0" />
    </clipPath>
    <clipPath
       id="b46a85b818-4">
      <path
         d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4594-2" />
    </clipPath>
    <clipPath
       id="931287b357-2">
      <path
         d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4597-2" />
    </clipPath>
    <clipPath
       id="9f8d5c6b67-0">
      <path
         d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4600-5" />
    </clipPath>
    <clipPath
       id="a131c9c548-5">
      <path
         d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4603-2" />
    </clipPath>
    <clipPath
       id="65456aac5f-4">
      <path
         d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
         clip-rule="nonzero"
         id="path4588-9" />
    </clipPath>
    <clipPath
       id="69488bb349-9">
      <path
         d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4591-3" />
    </clipPath>
    <clipPath
       id="b46a85b818-6">
      <path
         d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4594-0" />
    </clipPath>
    <clipPath
       id="931287b357-5">
      <path
         d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4597-0" />
    </clipPath>
    <clipPath
       id="9f8d5c6b67-2">
      <path
         d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4600-9" />
    </clipPath>
    <clipPath
       id="a131c9c548-4">
      <path
         d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4603-3" />
    </clipPath>
    <clipPath
       id="65456aac5f-9-8">
      <path
         d="m 491.57422,89.550781 h 282 V 413.55078 h -282 z m 0,0"
         clip-rule="nonzero"
         id="path4588-6-9" />
    </clipPath>
    <clipPath
       id="69488bb349-1-2">
      <path
         d="M 491.57422,89.550781 H 690 V 344 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4591-0-8" />
    </clipPath>
    <clipPath
       id="b46a85b818-4-8">
      <path
         d="M 491.57422,129 H 596 V 323 H 491.57422 Z m 0,0"
         clip-rule="nonzero"
         id="path4594-2-8" />
    </clipPath>
    <clipPath
       id="931287b357-2-6">
      <path
         d="M 491.57422,267 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4597-2-8" />
    </clipPath>
    <clipPath
       id="9f8d5c6b67-0-3">
      <path
         d="M 491.57422,249 H 529 v 37 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4600-5-8" />
    </clipPath>
    <clipPath
       id="a131c9c548-5-3">
      <path
         d="M 491.57422,230 H 529 v 38 h -37.42578 z m 0,0"
         clip-rule="nonzero"
         id="path4603-2-3" />
    </clipPath>
    <clipPath
       id="c3dfdef643">
      <path
         d="m 204,250 h 55 v 160.39844 h -55 z m 0,0"
         clip-rule="nonzero"
         id="path5650" />
    </clipPath>
    <clipPath
       id="68084a2692">
      <path
         d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5653" />
    </clipPath>
    <clipPath
       id="a9f825f88d">
      <path
         d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0"
         clip-rule="nonzero"
         id="path5656" />
    </clipPath>
    <clipPath
       id="e371159ec0">
      <path
         d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5659" />
    </clipPath>
    <clipPath
       id="1aacbe7e75">
      <path
         d="m 212,216.14844 h 57 V 290 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5662" />
    </clipPath>
    <clipPath
       id="01b6702168">
      <path
         d="m 411,216.14844 h 91 V 247 h -91 z m 0,0"
         clip-rule="nonzero"
         id="path5665" />
    </clipPath>
    <clipPath
       id="1fe81e7f15">
      <path
         d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0"
         clip-rule="nonzero"
         id="path5668" />
    </clipPath>
    <clipPath
       id="ef8cb358c1">
      <path
         d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5671" />
    </clipPath>
    <clipPath
       id="28c256b738">
      <path
         d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0"
         clip-rule="nonzero"
         id="path5674" />
    </clipPath>
    <clipPath
       id="c0fb14b776">
      <path
         d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0"
         clip-rule="nonzero"
         id="path5677" />
    </clipPath>
    <clipPath
       id="8f1e156615">
      <path
         d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5680" />
    </clipPath>
    <clipPath
       id="f1bcfcfd5a">
      <path
         d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5683" />
    </clipPath>
    <clipPath
       id="beeac1b475">
      <path
         d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5686" />
    </clipPath>
    <clipPath
       id="5946722d62">
      <path
         d="m 230,216.14844 h 83 V 230 h -83 z m 0,0"
         clip-rule="nonzero"
         id="path5689" />
    </clipPath>
    <clipPath
       id="f773d7ee6f">
      <path
         d="m 221,406 h 92 v 4.39844 h -92 z m 0,0"
         clip-rule="nonzero"
         id="path5692" />
    </clipPath>
    <clipPath
       id="f78a6aa82b">
      <path
         d="m 195,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5695" />
    </clipPath>
    <clipPath
       id="23ff1b1a5d">
      <path
         d="m 402,216.14844 h 23 V 230 h -23 z m 0,0"
         clip-rule="nonzero"
         id="path5698" />
    </clipPath>
    <clipPath
       id="16634a2329">
      <path
         d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5701" />
    </clipPath>
    <clipPath
       id="bc99b6b289">
      <path
         d="m 187,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5704" />
    </clipPath>
    <clipPath
       id="cf57b94926">
      <path
         d="m 376,406 h 57 v 4.39844 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5707" />
    </clipPath>
    <clipPath
       id="8d08386712">
      <path
         d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5710" />
    </clipPath>
    <clipPath
       id="024131cb33">
      <path
         d="m 264,216.14844 h 40 V 221 h -40 z m 0,0"
         clip-rule="nonzero"
         id="path5713" />
    </clipPath>
    <clipPath
       id="183c0c3a7a">
      <path
         d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5716" />
    </clipPath>
    <clipPath
       id="fe92227834">
      <path
         d="m 187,216.14844 h 22 V 230 h -22 z m 0,0"
         clip-rule="nonzero"
         id="path5719" />
    </clipPath>
    <clipPath
       id="c3dfdef643-2">
      <path
         d="m 204,250 h 55 v 160.39844 h -55 z m 0,0"
         clip-rule="nonzero"
         id="path5650-6" />
    </clipPath>
    <clipPath
       id="68084a2692-5">
      <path
         d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5653-8" />
    </clipPath>
    <clipPath
       id="a9f825f88d-7">
      <path
         d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0"
         clip-rule="nonzero"
         id="path5656-9" />
    </clipPath>
    <clipPath
       id="e371159ec0-6">
      <path
         d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5659-0" />
    </clipPath>
    <clipPath
       id="1aacbe7e75-4">
      <path
         d="m 212,216.14844 h 57 V 290 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5662-1" />
    </clipPath>
    <clipPath
       id="01b6702168-0">
      <path
         d="m 411,216.14844 h 91 V 247 h -91 z m 0,0"
         clip-rule="nonzero"
         id="path5665-4" />
    </clipPath>
    <clipPath
       id="1fe81e7f15-8">
      <path
         d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0"
         clip-rule="nonzero"
         id="path5668-7" />
    </clipPath>
    <clipPath
       id="ef8cb358c1-0">
      <path
         d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5671-8" />
    </clipPath>
    <clipPath
       id="28c256b738-6">
      <path
         d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0"
         clip-rule="nonzero"
         id="path5674-2" />
    </clipPath>
    <clipPath
       id="c0fb14b776-4">
      <path
         d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0"
         clip-rule="nonzero"
         id="path5677-7" />
    </clipPath>
    <clipPath
       id="8f1e156615-9">
      <path
         d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5680-3" />
    </clipPath>
    <clipPath
       id="f1bcfcfd5a-9">
      <path
         d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5683-2" />
    </clipPath>
    <clipPath
       id="beeac1b475-8">
      <path
         d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5686-3" />
    </clipPath>
    <clipPath
       id="5946722d62-0">
      <path
         d="m 230,216.14844 h 83 V 230 h -83 z m 0,0"
         clip-rule="nonzero"
         id="path5689-1" />
    </clipPath>
    <clipPath
       id="f773d7ee6f-7">
      <path
         d="m 221,406 h 92 v 4.39844 h -92 z m 0,0"
         clip-rule="nonzero"
         id="path5692-8" />
    </clipPath>
    <clipPath
       id="f78a6aa82b-9">
      <path
         d="m 195,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5695-1" />
    </clipPath>
    <clipPath
       id="23ff1b1a5d-5">
      <path
         d="m 402,216.14844 h 23 V 230 h -23 z m 0,0"
         clip-rule="nonzero"
         id="path5698-4" />
    </clipPath>
    <clipPath
       id="16634a2329-9">
      <path
         d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5701-2" />
    </clipPath>
    <clipPath
       id="bc99b6b289-5">
      <path
         d="m 187,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5704-7" />
    </clipPath>
    <clipPath
       id="cf57b94926-4">
      <path
         d="m 376,406 h 57 v 4.39844 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5707-9" />
    </clipPath>
    <clipPath
       id="8d08386712-9">
      <path
         d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5710-4" />
    </clipPath>
    <clipPath
       id="024131cb33-5">
      <path
         d="m 264,216.14844 h 40 V 221 h -40 z m 0,0"
         clip-rule="nonzero"
         id="path5713-9" />
    </clipPath>
    <clipPath
       id="183c0c3a7a-3">
      <path
         d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5716-5" />
    </clipPath>
    <clipPath
       id="fe92227834-7">
      <path
         d="m 187,216.14844 h 22 V 230 h -22 z m 0,0"
         clip-rule="nonzero"
         id="path5719-0" />
    </clipPath>
    <clipPath
       id="c3dfdef643-4">
      <path
         d="m 204,250 h 55 v 160.39844 h -55 z m 0,0"
         clip-rule="nonzero"
         id="path5650-3" />
    </clipPath>
    <clipPath
       id="68084a2692-7">
      <path
         d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5653-1" />
    </clipPath>
    <clipPath
       id="a9f825f88d-3">
      <path
         d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0"
         clip-rule="nonzero"
         id="path5656-8" />
    </clipPath>
    <clipPath
       id="e371159ec0-0">
      <path
         d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5659-9" />
    </clipPath>
    <clipPath
       id="1aacbe7e75-7">
      <path
         d="m 212,216.14844 h 57 V 290 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5662-9" />
    </clipPath>
    <clipPath
       id="01b6702168-9">
      <path
         d="m 411,216.14844 h 91 V 247 h -91 z m 0,0"
         clip-rule="nonzero"
         id="path5665-3" />
    </clipPath>
    <clipPath
       id="1fe81e7f15-2">
      <path
         d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0"
         clip-rule="nonzero"
         id="path5668-4" />
    </clipPath>
    <clipPath
       id="ef8cb358c1-3">
      <path
         d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5671-7" />
    </clipPath>
    <clipPath
       id="28c256b738-1">
      <path
         d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0"
         clip-rule="nonzero"
         id="path5674-22" />
    </clipPath>
    <clipPath
       id="c0fb14b776-0">
      <path
         d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0"
         clip-rule="nonzero"
         id="path5677-2" />
    </clipPath>
    <clipPath
       id="8f1e156615-1">
      <path
         d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5680-7" />
    </clipPath>
    <clipPath
       id="f1bcfcfd5a-5">
      <path
         d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5683-1" />
    </clipPath>
    <clipPath
       id="beeac1b475-7">
      <path
         d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5686-4" />
    </clipPath>
    <clipPath
       id="5946722d62-1">
      <path
         d="m 230,216.14844 h 83 V 230 h -83 z m 0,0"
         clip-rule="nonzero"
         id="path5689-7" />
    </clipPath>
    <clipPath
       id="f773d7ee6f-1">
      <path
         d="m 221,406 h 92 v 4.39844 h -92 z m 0,0"
         clip-rule="nonzero"
         id="path5692-1" />
    </clipPath>
    <clipPath
       id="f78a6aa82b-1">
      <path
         d="m 195,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5695-7" />
    </clipPath>
    <clipPath
       id="23ff1b1a5d-0">
      <path
         d="m 402,216.14844 h 23 V 230 h -23 z m 0,0"
         clip-rule="nonzero"
         id="path5698-40" />
    </clipPath>
    <clipPath
       id="16634a2329-8">
      <path
         d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5701-5" />
    </clipPath>
    <clipPath
       id="bc99b6b289-1">
      <path
         d="m 187,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5704-6" />
    </clipPath>
    <clipPath
       id="cf57b94926-6">
      <path
         d="m 376,406 h 57 v 4.39844 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5707-2" />
    </clipPath>
    <clipPath
       id="8d08386712-1">
      <path
         d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5710-9" />
    </clipPath>
    <clipPath
       id="024131cb33-6">
      <path
         d="m 264,216.14844 h 40 V 221 h -40 z m 0,0"
         clip-rule="nonzero"
         id="path5713-4" />
    </clipPath>
    <clipPath
       id="183c0c3a7a-8">
      <path
         d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5716-0" />
    </clipPath>
    <clipPath
       id="fe92227834-8">
      <path
         d="m 187,216.14844 h 22 V 230 h -22 z m 0,0"
         clip-rule="nonzero"
         id="path5719-1" />
    </clipPath>
    <clipPath
       id="c3dfdef643-28">
      <path
         d="m 204,250 h 55 v 160.39844 h -55 z m 0,0"
         clip-rule="nonzero"
         id="path5650-0" />
    </clipPath>
    <clipPath
       id="68084a2692-3">
      <path
         d="M 178.19922,216.14844 H 251 V 385 h -72.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5653-7" />
    </clipPath>
    <clipPath
       id="a9f825f88d-0">
      <path
         d="m 394,345 h 108 v 65.39844 H 394 Z m 0,0"
         clip-rule="nonzero"
         id="path5656-0" />
    </clipPath>
    <clipPath
       id="e371159ec0-3">
      <path
         d="M 178.19922,319 H 242 v 57 h -63.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5659-4" />
    </clipPath>
    <clipPath
       id="1aacbe7e75-9">
      <path
         d="m 212,216.14844 h 57 V 290 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5662-2" />
    </clipPath>
    <clipPath
       id="01b6702168-7">
      <path
         d="m 411,216.14844 h 91 V 247 h -91 z m 0,0"
         clip-rule="nonzero"
         id="path5665-42" />
    </clipPath>
    <clipPath
       id="1fe81e7f15-5">
      <path
         d="M 222,216.14844 H 364 V 325 H 222 Z m 0,0"
         clip-rule="nonzero"
         id="path5668-2" />
    </clipPath>
    <clipPath
       id="ef8cb358c1-4">
      <path
         d="M 178.19922,319 H 209 v 6 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5671-4" />
    </clipPath>
    <clipPath
       id="28c256b738-3">
      <path
         d="m 307,329 h 144 v 81.39844 H 307 Z m 0,0"
         clip-rule="nonzero"
         id="path5674-8" />
    </clipPath>
    <clipPath
       id="c0fb14b776-6">
      <path
         d="M 247,216.14844 H 416 V 256 H 247 Z m 0,0"
         clip-rule="nonzero"
         id="path5677-0" />
    </clipPath>
    <clipPath
       id="8f1e156615-8">
      <path
         d="M 178.19922,276 H 209 v 40 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5680-9" />
    </clipPath>
    <clipPath
       id="f1bcfcfd5a-2">
      <path
         d="M 178.19922,302 H 235 v 66 h -56.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5683-23" />
    </clipPath>
    <clipPath
       id="beeac1b475-1">
      <path
         d="M 178.19922,380 H 200 v 5 h -21.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5686-8" />
    </clipPath>
    <clipPath
       id="5946722d62-3">
      <path
         d="m 230,216.14844 h 83 V 230 h -83 z m 0,0"
         clip-rule="nonzero"
         id="path5689-4" />
    </clipPath>
    <clipPath
       id="f773d7ee6f-2">
      <path
         d="m 221,406 h 92 v 4.39844 h -92 z m 0,0"
         clip-rule="nonzero"
         id="path5692-2" />
    </clipPath>
    <clipPath
       id="f78a6aa82b-4">
      <path
         d="m 195,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5695-5" />
    </clipPath>
    <clipPath
       id="23ff1b1a5d-1">
      <path
         d="m 402,216.14844 h 23 V 230 h -23 z m 0,0"
         clip-rule="nonzero"
         id="path5698-7" />
    </clipPath>
    <clipPath
       id="16634a2329-5">
      <path
         d="M 178.19922,328 H 209 v 23 h -30.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5701-7" />
    </clipPath>
    <clipPath
       id="bc99b6b289-16">
      <path
         d="m 187,388 h 5 v 22.39844 h -5 z m 0,0"
         clip-rule="nonzero"
         id="path5704-9" />
    </clipPath>
    <clipPath
       id="cf57b94926-8">
      <path
         d="m 376,406 h 57 v 4.39844 h -57 z m 0,0"
         clip-rule="nonzero"
         id="path5707-1" />
    </clipPath>
    <clipPath
       id="8d08386712-3">
      <path
         d="M 178.19922,242 H 192 v 39 h -13.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5710-3" />
    </clipPath>
    <clipPath
       id="024131cb33-3">
      <path
         d="m 264,216.14844 h 40 V 221 h -40 z m 0,0"
         clip-rule="nonzero"
         id="path5713-7" />
    </clipPath>
    <clipPath
       id="183c0c3a7a-9">
      <path
         d="M 178.19922,250 H 183 v 40 h -4.80078 z m 0,0"
         clip-rule="nonzero"
         id="path5716-8" />
    </clipPath>
    <clipPath
       id="fe92227834-6">
      <path
         d="m 187,216.14844 h 22 V 230 h -22 z m 0,0"
         clip-rule="nonzero"
         id="path5719-7" />
    </clipPath>
    <clipPath
       id="be1d3e8250-8">
      <path
         d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0"
         clip-rule="nonzero"
         id="path4648-0" />
    </clipPath>
    <clipPath
       id="be1d3e8250-0">
      <path
         d="M 183,81 H 400.67187 V 182 H 183 Z m 0,0"
         clip-rule="nonzero"
         id="path4648-6" />
    </clipPath>
    <clipPath
       id="03ff9b82e1-9">
      <path
         d="M 170,81 H 400.67187 V 195 H 170 Z m 0,0"
         clip-rule="nonzero"
         id="path4657-2" />
    </clipPath>
    <clipPath
       id="42d7fac3ef-8">
      <path
         d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4651-4" />
    </clipPath>
    <clipPath
       id="f0bbbbc5b0-5">
      <path
         d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4654-6" />
    </clipPath>
    <clipPath
       id="42d7fac3ef-83">
      <path
         d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4651-8" />
    </clipPath>
    <clipPath
       id="f0bbbbc5b0-7">
      <path
         d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4654-5" />
    </clipPath>
    <clipPath
       id="42d7fac3ef-83-7">
      <path
         d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4651-8-3" />
    </clipPath>
    <clipPath
       id="f0bbbbc5b0-7-2">
      <path
         d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4654-5-7" />
    </clipPath>
    <clipPath
       id="42d7fac3ef-83-7-1">
      <path
         d="M 76.671875,122 H 187 v 97 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4651-8-3-6" />
    </clipPath>
    <clipPath
       id="f0bbbbc5b0-7-2-2">
      <path
         d="M 76.671875,195 H 101 v 24 H 76.671875 Z m 0,0"
         clip-rule="nonzero"
         id="path4654-5-7-0" />
    </clipPath>
    <clipPath
       id="2829f2d612">
      <path
         d="m 429,53.101562 h 12.60156 V 66 H 429 Z m 0,0"
         clip-rule="nonzero"
         id="path131488" />
    </clipPath>
    <clipPath
       id="c632f4d2a7">
      <path
         d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
         clip-rule="nonzero"
         id="path131491" />
    </clipPath>
    <clipPath
       id="9989cfe438">
      <path
         d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0"
         clip-rule="nonzero"
         id="path131494" />
    </clipPath>
    <clipPath
       id="c632f4d2a7-3">
      <path
         d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
         clip-rule="nonzero"
         id="path131491-5" />
    </clipPath>
    <clipPath
       id="2829f2d612-1">
      <path
         d="m 429,53.101562 h 12.60156 V 66 H 429 Z m 0,0"
         clip-rule="nonzero"
         id="path161552" />
    </clipPath>
    <clipPath
       id="c632f4d2a7-2">
      <path
         d="M 117.60156,53.101562 H 424 V 297.60156 H 117.60156 Z m 0,0"
         clip-rule="nonzero"
         id="path161555" />
    </clipPath>
    <clipPath
       id="9989cfe438-7">
      <path
         d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0"
         clip-rule="nonzero"
         id="path161558" />
    </clipPath>
    <clipPath
       id="9989cfe438-7-7">
      <path
         d="M 63,353.85156 H 381 V 533 H 63 Z m 0,0"
         clip-rule="nonzero"
         id="path161558-9" />
    </clipPath>
  </defs>
  <g
     inkscape:groupmode="layer"
     id="layer7"
     inkscape:label="base 1"
     transform="translate(-31.489834,-106.08173)">
    <rect
    style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-linejoin:round;stroke-linecap:square;paint-order:stroke markers fill"
       id="rect2763"
       width="160"
       height="64"
       x="31.489834"
       y="106.08173" />
    <text
       xml:space="preserve"
       style="font-size:6.35px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="74.920441"
       y="140.679"
       id="text61807"><tspan
         sodipodi:role="line"
         id="tspan61805"
         style="stroke-width:0.264583;fill:#ffffff"
         x="74.920441"
         y="140.679">BASE</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer8"
     inkscape:label="qr"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <g
       id="g6201" />
    <rect
       style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
       id="rect2891"
       width="56"
       height="56"
       x="65.48983"
       y="110.08173"
       transform="translate(-1.2083333e-6)" />
    <text
       xml:space="preserve"
       style="font-size:6.35px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="87.504173"
       y="139.84651"
       id="text42933"><tspan
         sodipodi:role="line"
         id="tspan42931"
         style="stroke-width:0.264583;fill:#ffffff"
         x="87.504173"
         y="139.84651">QR</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer13"
     inkscape:label="qrImg"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <image
       width="50.601562"
       height="50.601562"
       preserveAspectRatio="none"
       xlink:href="{imageURL}"
       id="image212534-8"
       x="68.181892"
       y="112.61893"
       style="fill:#ffffff" />
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer9"
     inkscape:label="amount"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <rect
       style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-linejoin:round;stroke-linecap:square;paint-order:stroke markers fill"
       id="rect2997"
       width="28"
       height="16"
       x="34.314835"
       y="110.08173"
       transform="translate(-1.2083333e-6)" />
    <text
       xml:space="preserve"
       style="font-size:5.64444px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="35.828812"
       y="120.64099"
       id="text8063"
       transform="translate(-1.2083333e-6)"><tspan
         sodipodi:role="line"
         id="tspan8061"
         style="font-size:5.64444px;stroke-width:0.264583;fill:#000000"
         x="35.828812"
         y="120.64099">{denomination}</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer14"
     inkscape:label="brand"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <rect
    style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-linejoin:round;stroke-linecap:square;paint-order:stroke markers fill"
       id="rect6092"
       width="28"
       height="40"
       x="34.314835"
       y="126.6109" />
    <text
       xml:space="preserve"
       style="font-size:6.35px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="-156.20766"
       y="49.856773"
       id="text21371"
       transform="rotate(-90)"><tspan
         sodipodi:role="line"
         id="tspan21369"
         style="stroke-width:0.264583;fill:#ffffff"
         x="-156.20766"
         y="49.856773">BRAND</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer10"
     inkscape:label="mint"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <rect
       style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none"
       id="rect3123"
       width="64"
       height="24"
       x="124.66483"
       y="110.08173"
       transform="translate(-1.2083333e-6)" />
    <text
       xml:space="preserve"
       style="font-size:2.5px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="128.36896"
       y="124.18286"
       id="text46537"><tspan
         sodipodi:role="line"
         id="tspan46535"
         style="stroke-width:0.264583;fill:#000000"
         x="128.36896"
         y="124.18286">{mintUrl}</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer11"
     inkscape:label="Y"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <rect
    style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-linejoin:round;stroke-linecap:square;paint-order:stroke markers fill"
       id="rect5840"
       width="32"
       height="32"
       x="124.66483"
       y="134.61089" />
    <text
       xml:space="preserve"
       style="font-size:6.35px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="135.38336"
       y="152.8459"
       id="text52261"><tspan
         sodipodi:role="line"
         id="tspan52259"
         style="stroke-width:0.264583;fill:#ffffff"
         x="135.38336"
         y="152.8459">SIG</tspan></text>
  </g>
  <g
     inkscape:groupmode="layer"
     id="layer12"
     inkscape:label="YQR"
     transform="translate(-31.489834,-106.08173)"
     style="display:inline">
    <rect
    style="fill:#ffffff;stroke-width:0.2;stop-color:#000000;stroke:#000000;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;stroke-linejoin:round;stroke-linecap:square;paint-order:stroke markers fill"
       id="rect5966"
       width="32"
       height="32"
       x="156.66479"
       y="134.61089" />
    <text
       xml:space="preserve"
       style="font-size:6.35px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;stroke-width:0.264583;fill:#ffffff"
       x="160.56261"
       y="152.1151"
       id="text57281"><tspan
         sodipodi:role="line"
         id="tspan57279"
         style="stroke-width:0.264583;fill:#ffffff"
         x="160.56261"
         y="152.1151">SIG_QR</tspan></text>
  </g>
</svg>
