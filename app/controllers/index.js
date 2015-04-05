import Ember from 'ember';

export default Ember.Controller.extend({
  /**
   * Computed Property that evaluates to array of ObjectProxy objects that proxy original model.
   * The proxied object has isActive property that's used in the template to bind checkboxes.
   * This allows us to select checkboxes without modifying the proxied content
   * @see http://emberjs.com/api/classes/Ember.ObjectProxy.html
   */
  proxiedModels: Ember.computed.map('model', function(object){
    return Ember.ObjectProxy.create({
      content: object,
      isActive: false
    });
  }),
  /**
   * Computed Property that evaluates to array of object proxy instances that have isActive === true
   */
  proxiedSelected: Ember.computed.filterBy('proxiedModels', 'isActive', true),
  /**
   * Computed Property that evaluates to array of object proxy instances that have isActive === false
   */
  proxiedRest: Ember.computed.filterBy('proxiedModels', 'isActive', false),
  /**
   * Computed Property that evaluates to an array of selected objects (not proxies)
   */
  selected: Ember.computed.mapBy('proxiedSelected', 'content'),
});
