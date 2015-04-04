import Ember from 'ember';

export default Ember.Controller.extend({
  proxiedModels: Ember.computed.map('model', function(object){
    return Ember.ObjectProxy.create({
      content: object,
      isActive: false
    });
  }),
  proxiedSelected: Ember.computed.filterBy('proxiedModels', 'isActive', true),
  proxiedRest: Ember.computed.filterBy('proxiedModels', 'isActive', false),
  selected: Ember.computed.map('proxiedSelected', function(proxied){
    return proxied.content;
  })
});
