
import {createFlask} from "../objects/Flask.js";
import {createFunnel} from "../objects/Funnel.js";
import {createBurette} from "../objects/Burette.js";
import {createBeaker} from "../objects/Beaker.js";
import {createPipette} from "../objects/Pipette.js";
import {createBalance} from "../objects/Balance.js";
import {createWashBottle} from "../objects/Washbottle.js";
import {createWeighingBottle} from "../objects/WeighingBottle.js";
import {createEDTACrystals} from "../objects/EDTAcrystals.js";
export const objectRegistry = {
  flask: createFlask,
  funnel: createFunnel,
  burette: createBurette,
  beaker: createBeaker,
  pipette: createPipette,
  balance: createBalance,
  washBottle: createWashBottle,
  weighingBottle: createWeighingBottle,
  edtaCrystals: createEDTACrystals
};