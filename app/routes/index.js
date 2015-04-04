import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data.pushObject({
        name: `Item ${i}`
      });
    }
    return data;
  }
});
