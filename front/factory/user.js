angular.module('pliApp').factory('userFactory', ['localStorageService',
	function(localStorageService) {
		var userEntity = {
			userFirstname: '',
			userlastname: '',
			userId: '',
			logged: false
			//cloud = array
		};

		var existing = localStorageService.get('user');
		if (existing !== undefined && existing !== null && 'username') {
			var total = 0, matched = 0;
			for (var key in userEntity) {
				total++;
				if (key in existing)
					matched++;
			}
			if (total == matched)
				userEntity = existing;
		}

		userEntity.login = function() {
			userEntity.logged = true;
			localStorageService.set('user', {
				userFirstname: userEntity.userFirstname,
				userlastname: userEntity.userlastname,
				userId: userEntity.userId,
				logged: true
			});
			return userEntity;
		};

		userEntity.logout = function() {
			userEntity.logged = false;
			localStorageService.set('user', {
                userFirstname: userEntity.userFirstname,
				userlastname: userEntity.userlastname,
				userId: userEntity.userId,
				logged: false
			});
			return userEntity;
		};

		userEntity.isSignedIn = function() {
			return userEntity.logged;
		};
		userEntity.getUserId = function() {
			return userEntity.userId;
		};

		userEntity.getUsername = function() {
            var userName = {
                firstName: userEntity.userFirstname,
                lastName: userEntity.userlastname,
                userId: userEntity.userId
            }
			return userName;
		};

		userEntity.setUsername = function(userFirstname, userLastname , userId) {
			userEntity.userFirstname = userFirstname;
			userEntity.userlastname = userLastname;
			userEntity.userId = userId;
			localStorageService.set('user', {
				userFirstname: userFirstname,
				userlastname: userLastname,
				userId: userId,
				logged: userEntity.logged
			});
			return userEntity;
		};

		return userEntity;
	}
]);
