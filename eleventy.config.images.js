const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(
        src,
        alt,
        widths = [400, 640, 800, 1200, 1920, 2560],
        sizes = '100vw') {
			//not working for now
			if (alt === undefined) {
				// You bet we throw an error on missing alt (alt="" works okay)
				throw new Error(`Missing \`alt\` on myImage from: ${src}`);
			}
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "auto"];
			let filenameFormat = function (hash, src, width, format, options) {
				const { name } = path.parse(src);
				return `${name}-${width}px.${format}`;
			};
			let file = relativeToInputPath(this.page.inputPath, src);
			let metadata = await eleventyImage(file, {
				widths: widths || ["auto"],
				formats,
				filenameFormat,
				outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			});
			let imageAttributes = {
				alt,
				sizes,
				loading: "lazy",
				decoding: "async",
			};
			let options = { whitespaceMode: "block" };
			return eleventyImage.generateHTML(metadata, imageAttributes, options);
		});
};