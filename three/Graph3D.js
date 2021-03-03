import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { TrackballControls } from '../controls/TrackballControls.js';
class Graph3D {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 800/ 550, 0.1, 1000);
        this.camera.position.set(0, 0, 100);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById(container),
            antialias: true
        });
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.controls = new TrackballControls(this.camera,document.getElementById(container));
        this.controls.rotateSpeed = 1;
        this.controls.zoomSpeed = 0.9;
        this.controls.panSpeed = 0.8;
        this.controls.keys = [65, 83, 68];
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( 800, 550 );
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => {
            this.render(); 
        });
        this.datapoints = null;
    }
    render() {
        this.renderer.setClearColor(0xffffff);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => {
            this.render(); 
        });
    }
    plot3d(points) {
        var material = new THREE.LineBasicMaterial({ color: "#00ff00", linewidth: 1 });
        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var orbitgraphics = new THREE.Line(geometry, material);
        if (this.datapoints != null) {
            this.scene.remove(this.datapoints);
        }
        this.scene.add(orbitgraphics);
        this.datapoints = orbitgraphics;
    }
}
export default Graph3D;