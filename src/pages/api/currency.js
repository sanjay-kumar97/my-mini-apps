// import axios from "axios";

// export default async function handler(req, res) {
//   const data = req?.body;
//   console.log(data, data.param, "DATA");
//   const response = await axios({
//     url: `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/${req?.body?.param}`,
//     method: "GET",
//   });

//   try {
//     res.status(200).json(response.data);
//   } catch (e) {
//     res.status(400).json(response.data);
//   }
// }

import axios from "axios";

export default async function handler(req, res) {
  const method = "GET";
  const url = `https://v6.exchangerate-api.com/v6/${process.env.CURRENCY_API_KEY}/${req?.body?.param}`;
  await axios({
    url,
    method,
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log({ err });
      return err;
    });
}
