/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Syllabus from '../api/syllabus/syllabus.model';


Syllabus.find({}).removeAsync()
  .then(() => {
    Syllabus.createAsync({
      _id: '5677bcec37407aa60754252b',
      academy: 'EASV',
      year: 2016,
      title: 'JavaScript',
      education: 'Computer Science',
      lecturer: 'Lars',
      owner:'569e69cc1ab998358d37667d',
      objectives: 'Learn about angular Fullstack',

      iconurl: 'stuff',
      weekplans: [{
        week: 4,
        summary: 'Awesome week',
        topics: 'bob and alice',
        literature: 'stackoverflow',
        videos: 'videos by lars',
        assignments: 'completed',
        teaser: 'New stuff'
      }],
    }, {
      _id: '5677bcec37407aa60754252e',
      academy: 'EASV',
      iconurl: 'stuff',
      year: 2016,
      title: 'android',
      education: 'Computer',
      owner: '569e69cc1ab998358d37667d',
      objectives: 'learn'

    }).then(()=> {
      console.log('finished populating syllabusses');
    });

    });


User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      _id:'569e69cc1ab998358d37667d',
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
