import SvgSpeed from '../assets/speed.svg';
import SvgAcceleration from '../assets/acceleration.svg';
import SvgForce from '../assets/force.svg';
import SvgGasoline from '../assets/gasoline.svg';
import SvgExchange from '../assets/exchange.svg';
import SvgPeople from '../assets/people.svg';
import SvgEnergy from '../assets/energy.svg';
import SvgHybrid from '../assets/hybrid.svg';
import SvgCar from '../assets/car.svg';

export const selectSvg = (type) =>
	({
		electric: SvgEnergy,
		gasoline_motor: SvgGasoline,
		electric_motor: SvgEnergy,
		hybrid_motor: SvgHybrid,
		acceleration: SvgAcceleration,
		speed: SvgSpeed,
		exchange: SvgExchange,
		turning_diameter: SvgForce,
		seats: SvgPeople,
	}[type] || SvgCar);
