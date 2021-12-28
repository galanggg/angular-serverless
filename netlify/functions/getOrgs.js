const sanityClient = require("@sanity/client");
const imageUrlBuilder = require("@sanity/image-url");

// passing the env vars to Sanity.io
const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

exports.handler = async () => {
  // this query asks for all organizations in order of name ascending
  const query = '*[_type=="organization"] | order(name asc)';
  const organizationList = await sanity.fetch(query).then((results) => {
    // then it iterates over each org
    const allOrganizations = results.map((organization) => {
      // & assigns its properties to output
      const output = {
        name: organization.title,
        website: organization.website,
        donationAmount: organization.donationAmount,
        description: organization.shortDescription,
        twitter: organization.twitter,
      };

      // we want to make sure an image exists before we assign it
      const image =
        organization.images && organization.images.length > 0
          ? organization.images[0].asset._ref
          : null;

      if (image) {
        // this is where we use the library to make a URL from the image records
        output.image = imageUrlBuilder(sanity).image(image).url();
      }
      return output;
    });
    // this log lets us see that we're getting the projects
    // we can delete this once we know it works
    console.log(allOrganizations);

    // now it will return all of the organizations and the properties requested
    return allOrganizations;
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(organizationList),
  };
};
