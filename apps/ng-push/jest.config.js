module.exports = {
  name: 'ng-push',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-push',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
