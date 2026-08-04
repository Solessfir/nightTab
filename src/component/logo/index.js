import { easterEgg } from '../easterEgg';

import { node } from '../../utility/node';

import './index.css';

const SVG_NS = 'http://www.w3.org/2000/svg';

export const Logo = function() {

  this.element = {
    logo: node('div|class:logo')
  };

  this.buildSvg = () => {

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'logo-shapes');
    svg.setAttribute('viewBox', '0 0 512 512');
    svg.setAttribute('version', '1.1');

    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', '256');
    circle.setAttribute('cy', '256');
    circle.setAttribute('r', '256');
    circle.setAttribute('class', 'logo-circle');

    const crossX = document.createElementNS(SVG_NS, 'path');
    crossX.setAttribute('d', 'M374 224H138C132.477 224 128 228.477 128 234V278C128 283.523 132.477 288 138 288H374C379.523 288 384 283.523 384 278V234C384 228.477 379.523 224 374 224Z');
    crossX.setAttribute('class', 'logo-cross-x');

    const crossY = document.createElementNS(SVG_NS, 'path');
    crossY.setAttribute('d', 'M278 128H234C228.477 128 224 132.477 224 138V374C224 379.523 228.477 384 234 384H278C283.523 384 288 379.523 288 374V138C288 132.477 283.523 128 278 128Z');
    crossY.setAttribute('class', 'logo-cross-y');

    svg.appendChild(circle);
    svg.appendChild(crossX);
    svg.appendChild(crossY);

    return svg;

  };

  this.assemble = () => {

    this.element.logo.appendChild(this.buildSvg());

  };

  this.bind = () => {

    this.element.logo.addEventListener('dblclick', () => { easterEgg.toaster.bind.add(); });

  };

  this.logo = () => {
    return this.element.logo;
  };

  this.assemble();

  this.bind();

};
