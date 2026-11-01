import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRankTier,
  generateRandomCodename,
  calculateGhostPaperSplit,
  calculateFlameIntensity,
  calculateAchievableRoutine,
  calculateCheckpointRewards
} from './studyLogic';

test('calculateRankTier returns correct progression and level', () => {
  const bronze = calculateRankTier(150);
  assert.equal(bronze.name, 'Bronze I');
  assert.equal(bronze.level, 1);
  assert.equal(bronze.progressPct, 50);

  const platinum = calculateRankTier(1500);
  assert.equal(platinum.name, 'Platinum I');
  assert.equal(platinum.level, 9);
  assert.equal(platinum.progressPct, 50);

  const conqueror = calculateRankTier(6000);
  assert.equal(conqueror.name, 'Conqueror Prime');
  assert.equal(conqueror.level, 20);
});

test('calculateGhostPaperSplit maintains 60/25/15 target', () => {
  const split = calculateGhostPaperSplit(20);
  assert.equal(split.currentChapter, 12);
  assert.equal(split.pastChapters, 5);
  assert.equal(split.pastMistakes, 3);
  assert.equal(split.currentChapter + split.pastChapters + split.pastMistakes, 20);
});

test('generateRandomCodename produces adjective-noun hyphenated string', () => {
  const codename = generateRandomCodename();
  assert.match(codename, /^[a-z]+-[a-z]+$/);
});

test('calculateFlameIntensity scales with streak length', () => {
  const day1 = calculateFlameIntensity(1);
  const day15 = calculateFlameIntensity(15);
  const day30 = calculateFlameIntensity(30);

  assert.equal(day1.scale, 1.0);
  assert.ok(day15.scale > day1.scale);
  assert.ok(day30.scale > day15.scale);
});

test('calculateAchievableRoutine adapts to energy modes', () => {
  const fullRoutine = calculateAchievableRoutine({
    baselineAvg: 35,
    daysLeft: 109,
    energyMode: 'full',
    dreamGoal: 'LDCE Robotics'
  });
  assert.equal(fullRoutine.dailyHours, 3.5);

  const lowRoutine = calculateAchievableRoutine({
    baselineAvg: 35,
    daysLeft: 109,
    energyMode: 'low',
    dreamGoal: 'LDCE Robotics'
  });
  assert.equal(lowRoutine.dailyHours, 2.1);

  const survivalRoutine = calculateAchievableRoutine({
    baselineAvg: 35,
    daysLeft: 109,
    energyMode: 'survival',
    dreamGoal: 'LDCE Robotics'
  });
  assert.equal(survivalRoutine.dailyHours, 0.5);
});

test('calculateCheckpointRewards gives proper Urja and Sikka', () => {
  const rewards = calculateCheckpointRewards('full');
  assert.equal(rewards.urjaEarned, 45);
  assert.equal(rewards.sikkaEarned, 15);
});
