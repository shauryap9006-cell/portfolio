import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2007',
    title: 'Born',
    subtitle: 'The Beginning',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2022',
    title: 'School',
    subtitle: 'Higher Secondary School',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2025',
    title: 'College',
    subtitle: 'Started My Degree',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2026',
    title: 'Development',
    subtitle: 'Started Learning Programming',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: '2027',
    title: '?',
    subtitle: 'Future in the making',
    position: 'right',
  }
]