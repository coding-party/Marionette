var HRLab = new Backbone.Marionette.Application();

var User = Backbone.Model.extend({});
var Users = Backbone.Collection.extend({
	model: User
});

var UserView = Backbone.Marionette.ItemView.extend({
	template: '#userView'

});

var NoUsersView = Backbone.Marionette.ItemView.extend({
	template: '#NoUsersView'
});

var UsersView = Backbone.Marionette.CollectionView.extend({
	ItemView: UserView,
	emptyView: NoUsersView
});

var FormView = Backbone.Marionette.ItemView.extend({
	template: '#formView',
	events: {
		'submit': 'createNewUser'
	},
	ui: {
		name: '#name',
		age: '#age'
	},

	createNewUser: function(){
		console.log('click');
		this.collection.add({
			name: this.ui.name.val(),
			name: this.ui.age.val(),
		});
		this.ui.name.val('');
		this.ui.age.val('');
	}
	deleteUser: function(){
		//this function should remove this user
	}
});

HRLab.addRegions({
	form: '#form',
	list: '#list'
});

HRLab.addInitializer(function(){
	HRLab.users = new Users();
	HRLab.form.show(new FormView({collection: HRLab.users}));
	HRLab.list.show(new UsersView({collection: HRLab.users}));
});

HRLab.start()