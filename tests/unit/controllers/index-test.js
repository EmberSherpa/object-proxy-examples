import Ember from 'ember';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('objects are wrapped in object proxy', function(assert){
  let model = [
    {name: 'foo'},
    {name: 'bar'},
    {name: 'baz'}
  ];
  let subject = this.subject({
    model: model
  });

  let isAllProxies = subject.get('proxiedModels').reduce(function(result, item){
    if (!Ember.ObjectProxy.detectInstance(item)) {
      return false;
    }
    return result;
  }, true);

  assert.ok(isAllProxies, "all models are instances of object proxies");
  assert.equal(subject.get('proxiedModels.firstObject.isActive'), false, "object proxies have isActive property and it defaults to false");
  assert.equal(subject.get('proxiedModels.firstObject.content'), model[0], "object proxies proxy original modelc content");
});

test('activating proxied objects updates selected array', function(assert){
  let model = [
    {name: 'foo'},
    {name: 'bar'},
    {name: 'baz'}
  ];
  let subject = this.subject({
    model: model
  });
  assert.deepEqual(subject.get('selected'), [], "selected is empty");
  Ember.run(()=>{ subject.get('proxiedModels.firstObject').set('isActive', true); });
  assert.deepEqual(subject.get('selected'), [model[0]], "first object is selected");
  Ember.run(()=>{ subject.get('proxiedModels.lastObject').set('isActive', true); });
  assert.deepEqual(subject.get('selected'), [model[0], model[2]], "first and last objects are selected");
});
