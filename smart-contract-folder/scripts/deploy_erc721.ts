// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { run } from "hardhat";

const richardAddress = "0x1155bfc5270ea845990ABc1F941851603486fa7a";
const lucasAddress = "0xFf6B4F53f8655Db04d46a08dAEBB6277243aCD29";
const ipfs = [
  "QmefQCqppvDHV493UL4BJcYQLaQB95svrqoEmkbXaT88vy", //Cantagalo 2022
  "QmSAUijdrmNL8AcV7P5Doxef2STtsoMyJix4deDxLGwpPC", //Cantagalo 2022 Verão
  "QmdFyFJAvDKxdwqEB5dd639vh8whtgKisauAou1b7Acwop", //Cantagalo 2022 Outono
  "QmXsgMHZMdVJjg7GY5cxRGtjW7hE1kovZjP15sCTUHJ1rQ", //Cantagalo 2022 Primavera
  "QmQxWiMsWMv3twns76XYuAfqfufRL8evaWifFP45gUemtp", //Cantagalo 2022 Inverno
  "QmdYgt25L353NsufGn4G8ZxB8kEWz8vkzh9uWvD6pMCumJ", //PAVÃO PAVÃOZINHO VERÃO
  "QmQJnHsUTJNUS5XZMgs9z1WC4YceNi4vA1swYGxq3dF9aU", //Pavão Pavãozinho Primavera
  "QmYf8i3y9MzZ57bh9xp1UYGvquMj3ssdQNg1jhiRBEGN69", //Pavão Pavãozinho Outono
  "QmTnFefc2omMs7YVA4KiwComFWaqL9hKHdchKc78HXvvkY", //Pavão Pavãozinho Inverno
  "QmeoW25Yy7nNyVsfd2Ao2kQi5y4rfw76KYTiYTJJHa3bEL", //PAVÃO PAVÃOZINHO
  // "ipfs://",
];
async function main() {
  const nftContract = await ethers.getContractFactory("FavelaGO");
  const nftDeploy = await nftContract.deploy();

  const deployerAddress = (await ethers.getSigners())[0].address;
  await nftDeploy.deployed();

  console.log("nft deployed to:", nftDeploy.address);

  await run("verify:verify", {
    address: nftDeploy.address,
  });

  await nftDeploy.grantRole(await nftDeploy.MINTER_ROLE(), richardAddress);
  await delay(1000);

  for (let index = 0; index < ipfs.length; index++) {
    await nftDeploy.AddItem(ipfs[index], true);
    await delay(1000);
  }

  for (let index = 0; index < ipfs.length; index++) {
    await nftDeploy.safeMint(richardAddress, index);
    await delay(1000);
    await nftDeploy.safeMint(lucasAddress, index);
    await delay(1000);
    await nftDeploy.safeMint(deployerAddress, index);
    await delay(1000);
  }
  console.log("finished");
}
function delay(ms: number) {
  console.log(`Starting Delay ${ms}`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
