import type { SyntheticEvent } from "react";

import masterPhoto from "~/assets/about/master-photo.svg";
import catalogBraceletDarkStar from "~/assets/catalog/bracelet-dark-star.svg";
import catalogBraceletLilith from "~/assets/catalog/bracelet-lilith.svg";
import catalogEarringsBlackRose from "~/assets/catalog/earrings-black-rose.svg";
import catalogNecklaceOnyxDrop from "~/assets/catalog/necklace-onyx-drop.svg";
import catalogNecklaceRose from "~/assets/catalog/necklace-rose.svg";
import braceletBeads1 from "~/assets/components/bracelet/beads-1.svg";
import braceletBeads2 from "~/assets/components/bracelet/beads-2.svg";
import braceletCharmCross from "~/assets/components/bracelet/charm-cross.svg";
import braceletCharmLilith from "~/assets/components/bracelet/charm-lilith.svg";
import braceletCharmStar from "~/assets/components/bracelet/charm-star.svg";
import braceletClasp from "~/assets/components/bracelet/clasp-bracelet.svg";
import braceletMagnetic from "~/assets/components/bracelet/clasp-magnetic.svg";
import earringsLockEnglish from "~/assets/components/earrings/lock-english.svg";
import earringsLockStuds from "~/assets/components/earrings/lock-studs.svg";
import earringsStoneOnyx from "~/assets/components/earrings/stone-onyx.svg";
import earringsStonePearl from "~/assets/components/earrings/stone-pearl.svg";
import necklaceChain1 from "~/assets/components/necklace/chain-1.svg";
import necklaceChain2 from "~/assets/components/necklace/chain-2.svg";
import necklaceClasp1 from "~/assets/components/necklace/clasp-1.svg";
import necklaceClasp2 from "~/assets/components/necklace/clasp-2.svg";
import necklacePendantCross from "~/assets/components/necklace/pendant-cross.svg";
import necklacePendantOnyx from "~/assets/components/necklace/pendant-onyx.svg";
import necklacePendantRose from "~/assets/components/necklace/pendant-rose.svg";
import ringProfileClassic from "~/assets/components/ring/profile-classic.svg";
import ringProfileFlat from "~/assets/components/ring/profile-flat.svg";
import ringStoneOnyx from "~/assets/components/ring/stone-onyx.svg";
import ringStonePearl from "~/assets/components/ring/stone-pearl.svg";

// PNG-ассеты не были приложены к проекту. Эти SVG временно сохраняют текущий
// визуальный стиль; загруженные PNG автоматически заменят их без правок кода.
const fallbacks: Record<string, string> = {
  "/assets/about/master.png": masterPhoto,
  "/assets/catalog/bracelet-dark-star.png": catalogBraceletDarkStar,
  "/assets/catalog/bracelet-lilith.png": catalogBraceletLilith,
  "/assets/catalog/earrings-black-rose.png": catalogEarringsBlackRose,
  "/assets/catalog/necklace-onyx-drop.png": catalogNecklaceOnyxDrop,
  "/assets/catalog/necklace-rose.png": catalogNecklaceRose,

  "/assets/components/necklace/chain-1.png": necklaceChain1,
  "/assets/components/necklace/chain-2.png": necklaceChain2,
  "/assets/components/necklace/choker.png": necklaceChain2,
  "/assets/components/necklace/beads-onyx.png": braceletBeads1,
  "/assets/components/necklace/clasp-bracelet.png": necklaceClasp1,
  "/assets/components/necklace/clasp-magnetic.png": necklaceClasp2,
  "/assets/components/necklace/pendant-cross.png": necklacePendantCross,
  "/assets/components/necklace/pendant-him.png": necklacePendantOnyx,
  "/assets/components/necklace/pendant-lilith.png": necklacePendantRose,
  "/assets/components/necklace/pendant-onyx.png": necklacePendantOnyx,
  "/assets/components/necklace/pendant-rose.png": necklacePendantRose,

  "/assets/components/bracelet/beads-black.png": braceletBeads1,
  "/assets/components/bracelet/beads-chain.png": braceletBeads2,
  "/assets/components/bracelet/beads-white.png": braceletBeads2,
  "/assets/components/bracelet/charm-angel.png": braceletCharmStar,
  "/assets/components/bracelet/charm-cross.png": braceletCharmCross,
  "/assets/components/bracelet/charm-him.png": braceletCharmLilith,
  "/assets/components/bracelet/charm-lilith.png": braceletCharmLilith,
  "/assets/components/bracelet/charm-oval.png": braceletCharmStar,
  "/assets/components/bracelet/charm-star.png": braceletCharmStar,
  "/assets/components/bracelet/clasp-bracelet.png": braceletClasp,
  "/assets/components/bracelet/clasp-heart.png": braceletMagnetic,
  "/assets/components/bracelet/clasp-magnetic.png": braceletMagnetic,

  "/assets/components/earrings/lock-english.png": earringsLockEnglish,
  "/assets/components/earrings/lock-studs.png": earringsLockStuds,
  "/assets/components/earrings/stone-black-rose.png": catalogEarringsBlackRose,
  "/assets/components/earrings/stone-cross.png": earringsStoneOnyx,
  "/assets/components/earrings/stone-onyx.png": earringsStoneOnyx,
  "/assets/components/earrings/stone-pearle.png": earringsStonePearl,
  "/assets/components/earrings/stone-pearl.png": earringsStonePearl,

  "/assets/components/ring/profile-classic-gold.png": ringProfileClassic,
  "/assets/components/ring/profile-classic-silver.png": ringProfileClassic,
  "/assets/components/ring/profile-flat-gold.png": ringProfileFlat,
  "/assets/components/ring/profile-flat-silver.png": ringProfileFlat,
  "/assets/components/ring/stone-onyx-gold.png": ringStoneOnyx,
  "/assets/components/ring/stone-onyx-silver.png": ringStoneOnyx,
  "/assets/components/ring/stone-pearl.png": ringStonePearl,
};

export function handleAssetError(
  event: SyntheticEvent<HTMLImageElement, Event>,
  requestedPath: string | undefined,
) {
  const image = event.currentTarget;
  if (image.dataset.fallbackApplied === "true") return;

  const fallback = requestedPath ? fallbacks[requestedPath] : undefined;
  if (fallback) {
    image.dataset.fallbackApplied = "true";
    image.src = fallback;
  } else {
    image.style.visibility = "hidden";
  }
}
