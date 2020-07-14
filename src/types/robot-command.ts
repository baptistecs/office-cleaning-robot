import CompassDirection from "./compass-direction";

type RobotCommand = {
  direction: CompassDirection;
  nbSteps: number;
};

export default RobotCommand;
