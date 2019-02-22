webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__partials_Navbar_vue__ = __webpack_require__(33);
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'App',
  components: {
    Navbar: __WEBPACK_IMPORTED_MODULE_0__partials_Navbar_vue__["a" /* default */]
  },
  data: function data() {
    return {};
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth__ = __webpack_require__(35);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      auth: false,
      email: ""
    };
  },
  created: function created() {
    var _this = this;

    this.auth = __WEBPACK_IMPORTED_MODULE_0__services_auth__["a" /* default */].check();
    if (this.auth) {
      axios({
        method: "post",
        url: "codeword/details",
        headers: {
          token: window.localStorage.getItem("token")
        }
      }).then(function (result) {
        _this.email = result.data.emailKey;
      });
    }
  },

  methods: {
    onLogout: function onLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('status');
      this.auth = __WEBPACK_IMPORTED_MODULE_0__services_auth__["a" /* default */].check();
      this.$router.push({ path: "/" });
    },
    changePassword: function changePassword() {
      this.$router.push({ path: "/changePassword" });
    },
    createCodeWordSet: function createCodeWordSet() {
      this.$router.push({ path: "/createcodewordset" });
    },
    deleteCodeWordSet: function deleteCodeWordSet() {
      this.$router.push({ path: "/deletecodewordset" });
    }
  },
  watch: {
    $route: function $route(to, from, next) {
      this.auth = __WEBPACK_IMPORTED_MODULE_0__services_auth__["a" /* default */].check();
    }
  }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'SignInPage',
  data: function data() {
    return {
      msg: '',
      signed: false,
      emailid: '',
      pass: ''
    };
  },

  methods: {
    signIn: function signIn() {
      var _this2 = this;

      var data = new FormData(document.querySelector('form'));
      this.emailid = data.get('emailID').toLowerCase();
      this.pass = data.get('password');
      this.msg = '';
      if (this.emailid === null) {
        this.msg = 'Login Invalid';
        this.signed = false;
      } else {
        axios({
          method: 'post',
          url: 'codeword/validateEmail',
          data: {
            email: this.emailid
          }
        }).then(function (res) {
          if (res.data.message === true) {
            _this2.msg = '';
            var _data = new FormData(document.querySelector('form'));
            /* global axios */
            axios.post('codeword/signin', {
              email: _this2.emailid,
              password: _this2.pass
            }).then(function (response) {
              console.log(response.data.isInstructor);
              if (response.data.token) {
                _this2.msg = 'Signed in successfully. Redirecting .';
                _this2.signed = true;
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.isInstructor);
                var _this = _this2;
                setTimeout(function () {
                  if (_data.get('password').length === 5) {
                    _this.$router.push({ name: 'ChangePassword' });
                  } else if (response.data.isInstructor === false) {
                    _this.$router.push({ name: 'StudentDashboard' });
                  } else {
                    _this.$router.push({ name: 'InstructorDashboard' });
                  }
                }, 1000);
              } else {
                _this2.msg = response.data.message;
                _this2.signed = false;
              }
            });
          } else {
            _this2.msg = 'Invalid Login!!';
            _this2.signed = false;
          }
        });
      }
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      instructor: false,
      msg: '',
      signed: false
    };
  },

  validations: {
    password: {
      required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
      minLength: Object(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(8)
    },
    repeatPassword: {
      sameAsPassword: Object(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["sameAs"])('password')
    },
    instructor: {
      sameAs: Object(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["sameAs"])(function () {
        return true;
      })
    }
  },
  methods: {
    OnRegister: function OnRegister() {
      var _this2 = this;

      this.msg = '';
      var emailid = this.email;
      /* global axios */
      axios({
        method: 'post',
        url: 'codeword/validateEmail',
        data: {
          email: emailid
        }
      }).then(function (res) {
        var _this = _this2;
        if (res.data.message === false) {
          console.log('onregister clicked fullnaem', _this2.email);
          axios.post('codeword/signup', {
            email: _this2.email.toLowerCase(),
            password: _this2.password,
            instructor: _this2.instructor
          }).then(function (res) {
            _this2.msg = 'Successfully Registered and Redirecting to SignIn Page.';
            _this2.signed = true;
            if (res.data.message) {
              setTimeout(function () {
                _this.$router.push({ path: '/' });
              }, 1000);
            }
          });
        } else {
          _this2.msg = 'This user registerd already!!';
          _this2.signed = false;
        }
      });
    }
  }
});

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'InstructorDashboard',
  data: function data() {
    return {
      courseName: '',
      startDate: '',
      endDate: '',
      startSurveyurldata: '',
      endSurveyurldata: '',
      CodeWordSetName: '',
      file: '',
      codeWordSetData: '',
      coursesData: '',
      selectedCourse: '',
      codeWordSetCount: '',
      isEnabled: true,
      count: 0,
      checkFileUpload: false
    };
  },
  created: function created() {
    this.startDate = new Date() && new Date().toISOString().split('T')[0];
    this.endDate = new Date() && new Date(new Date().getMonth() + 4).toISOString().split('T')[0];
    this.fetchCourseList();
  },

  watch: {
    startDate: function startDate(value) {
      var start = new Date(value);
      this.startDate = new Date(start) && new Date(start).toISOString().split('T')[0];
      this.endDate = new Date(start.setMonth(start.getMonth())) && new Date(start.setMonth(start.getMonth() + 4)).toISOString().split('T')[0];
    },

    '$route': 'fetchCourseList'
  },
  methods: {
    CreateCourse: function CreateCourse() {
      var _this = this;

      if (this.CodeWordSetName === '') {
        __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()('Please choose codeword set!');
      } else {
        var data = new FormData(document.querySelector('form'));
        this.courseName = data.get('courseName');
        this.startDate = this.startDate;
        this.endDate = this.endDate;
        this.startSurveyurldata = data.get('startSurveyurl');
        this.endSurveyurldata = data.get('endSurveyurl');
        var formData = new FormData();
        formData.append('CourseNameKey', this.courseName);
        formData.append('CodeWordSetName', this.CodeWordSetName);
        formData.append('file', this.file);
        console.log(this.file);
        /* global axios $ */
        axios({
          method: 'post',
          url: 'codeword/addnewCourse',
          data: {
            token: window.localStorage.getItem('token'),
            courseNameKey: this.courseName,
            codeWordSetName: this.CodeWordSetName,
            startDate: this.startDate,
            endDate: this.endDate,
            preSurveyURL: this.startSurveyurldata,
            postSurveyURL: this.endSurveyurldata
          }
        }).then(function (response) {
          if (response) {
            axios.post('codeword/addcoursestudent', formData, { headers: {
                'Content-Type': 'multipart/form-data',
                token: window.localStorage.getItem('token')
              }
            }).then(function (response) {
              console.log(response.data.message);
              if (response.data.message === 'Course student successfully!') {
                $('#addcourse').modal('hide');
                _this.fetchCourseList();
              } else {
                __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()('Less Codewords', response.data.message, 'error');
              }
            });
          }
        }).catch(function (error) {
          __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()('Error Message', error.response.data.message, 'error');
          console.log('Eoor' + error);
        });
      }
    },
    handleFileUpload: function handleFileUpload() {
      var _this2 = this;

      this.checkFileUpload = true;
      this.file = this.$refs.file.files[0];
      console.log(this.file);
      var data = new FormData(document.querySelector('form'));
      axios.post('/codeword/getdatastudentxlsx', data).then(function (response) {
        _this2.count = response.data.count;
        console.log(_this2.count + 'student');
      });
    },
    getStartDate: function getStartDate() {
      var today = new Date();
      document.getElementById('startDate').value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    },
    loadCourseModel: function loadCourseModel() {
      var _this3 = this;

      axios({
        method: 'get',
        url: 'codeword/getcodewordset',
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this3.codeWordSetData = response.data.data;
      });
    },
    status: function status() {
      this.isEnabled = false;
    },
    fetchCourseList: function fetchCourseList() {
      var _this4 = this;

      axios({
        method: 'get',
        url: 'codeword/getCourseList',
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this4.coursesData = response.data.data;
        console.log(_this4.coursesData);
      });
    },
    getCourseName: function getCourseName(item) {
      this.selectedCourse = item;
    },
    deleteCourseKey: function deleteCourseKey() {
      var _this5 = this;

      console.log('deletecoursekey');
      axios({
        method: 'post',
        url: 'codeword/deleteCourse',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          CourseNameKey: this.selectedCourse
        }
      }).then(function (response) {
        $('#deleteCourse').modal('hide');
        _this5.fetchCourseList();
      });
    }
  }
});

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ForgetPage',
  data: function data() {
    return {
      msg: '',
      signed: false,
      email: ''
    };
  },

  methods: {
    forget: function forget() {
      var _this2 = this;

      this.msg = '';
      var emailid = this.email.toLowerCase();
      /* global axios */
      axios({
        method: 'post',
        url: 'codeword/validateEmail',
        data: {
          email: emailid
        }
      }).then(function (res) {
        console.log(res.data.message);
        if (res.data.message === true) {
          axios.post('codeword/sendmail', {
            email: emailid
          }).then(function (response) {
            _this2.msg = 'Sent temporary password to your email';
            _this2.signed = true;
            var _this = _this2;
            setTimeout(function () {
              _this.$router.push({ path: '/' });
            }, 2000);
          });
        } else {
          _this2.msg = 'Invalid User!!';
          _this2.signed = false;
        }
      });
    }
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ChangePassword',
  data: function data() {
    return {
      newpassword: '',
      repeatPassword: '',
      changed: '',
      loginrole: this.$route.params.loginrole
    };
  },
  created: function created() {
    console.log('password page');
  },

  validations: {
    newpassword: {
      required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
      minLength: Object(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(8)
    },
    repeatPassword: {
      sameAsPassword: Object(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["sameAs"])('newpassword')
    }
  },
  methods: {
    changePassword: function changePassword() {
      var _this2 = this;

      this.msg = '';
      /* global axios */
      axios({
        method: 'post',
        url: 'codeword/changepassword',
        data: {
          token: window.localStorage.getItem('token'),
          password: this.newpassword
        }
      }).then(function (res) {
        var _this = _this2;
        if (res.data.message === true) {
          setTimeout(function () {
            this.msg = 'Changed Password Successfully!!';
            if (_this.loginrole === true) {
              _this.$router.push({ path: '/instructordashboard' });
            } else {
              _this.$router.push({ path: '/studentdashboard' });
            }
          }, 1000);
        }
      });
    }
  }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'InstructorDashboard',
  data: function data() {
    return {
      courseName: '',
      startSurveyurldata: '',
      endSurveyurldata: '',
      Codeword: '',
      userCourses: '',
      status: true,
      show: true
    };
  },

  /* global axios  */
  created: function created() {
    this.fetchUserData();
  },

  watch: {
    '$route': 'fetchUserData'
  },
  methods: {
    fetchUserData: function fetchUserData() {
      var _this = this;

      axios({
        method: 'get',
        url: 'codeword/getstudentcourses',
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        if (response.data.data === 'No courses found') {
          _this.status = false;
        } else {
          _this.userCourses = response.data.data;
        }
      });
    },
    getCodeWord: function getCodeWord(index) {
      var _this2 = this;

      // yet to write an API Call to change status as acknowledged
      // this.userCourses[index].Acknowledged = true
      axios({
        method: 'post',
        url: 'codeword/codewordAcknowledged',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          acknowledgedStatus: this.userCourses[index]
        }
      }).then(function (response) {
        if (response.data.message === true) {
          _this2.userCourses[index].Acknowledged = true;
        }
      });
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global axios $ */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'CodeWordSet',
  data: function data() {
    return {
      files: '',
      codeWordSetCount: [],
      codeWordTempSetData: [],
      codeWordSetData: [],
      count: 0,
      CodewordSetName: ''
    };
  },

  /* global axios */
  methods: {
    // Getting the data from uploaded xls file
    previewFiles: function previewFiles() {
      var _this = this;

      this.files = this.$refs.myFile;
      var data = new FormData(document.querySelector('form'));
      axios.post('/codeword/getdataxlsx', data).then(function (response) {
        _this.codeWordSetData = response.data.data;
        _this.count = response.data.count;
        console.log(_this.count);
      });
    },


    // Calling API of codeWordSet controller and sending xls data in form of json
    saveCodeWordData: function saveCodeWordData() {
      var _this2 = this;

      var data = new FormData(document.querySelector('form'));
      var sendData = {
        CodeWordSetName: data.get('dataSetName'),
        Codewords: this.codeWordSetData
      };
      axios({
        method: 'post',
        url: '/codeword/addcodewordset',
        data: sendData,
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        $('#addcodeword').modal('hide');
        _this2.getCodeWordData();
      });
    },
    getCodeWordData: function getCodeWordData() {
      var _this3 = this;

      axios({
        method: 'get',
        url: '/codeword/getcodewordset',
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this3.codeWordTempSetData = response.data.data;
      });
    },
    codewordSetDelete: function codewordSetDelete() {
      var _this4 = this;

      console.log('test');
      axios({
        method: 'delete',
        url: '/codeword/deletecodewordset',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          CodeWordSetName: this.CodewordSetName
        }
      }).then(function (response) {
        $('#deleteCodwordsetmodel').modal('hide');
        _this4.getCodeWordData();
      });
    },
    selectCodewordSet: function selectCodewordSet(setName) {
      this.CodewordSetName = setName;
    }
  },
  mounted: function mounted() {
    this.getCodeWordData();
  }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global axios */

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'CodeWordSet',
  data: function data() {
    return {
      CodeWordSetName: '',
      codewords: [],
      selectedCodeword: '',
      codewordIndex: '',
      newCodeword: '',
      isPermanent: Boolean
    };
  },
  created: function created() {
    if (this.$route.params.CodeWordSetName == null) {
      this.CodeWordSetName = window.localStorage.getItem('setId');
      this.getCodeWords();
    } else {
      window.localStorage.setItem('setId', this.$route.params.CodeWordSetName);
      this.CodeWordSetName = this.$route.params.CodeWordSetName;
      this.getCodeWords();
    }
  },

  methods: {
    getCodeWords: function getCodeWords() {
      var _this = this;

      axios({
        method: 'post',
        url: '/codeword/getCodewords',
        data: {
          CodeWordSetKey: this.CodeWordSetName
        },
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this.codewords = response.data.codewords;
        _this.isPermanent = response.data.isPermanent;
      });
    },
    selectCodeword: function selectCodeword(index) {
      this.codewordIndex = index;
      this.selectedCodeword = this.codewords[index];
    },
    editCodeword: function editCodeword(selectedCodeword, index) {
      this.codewords[this.codewordIndex] = selectedCodeword;
      this.updateCodeword();
    },
    deleteCodeword: function deleteCodeword() {
      this.codewords.splice(this.codewordIndex, 1);
      this.updateCodeword();
    },
    addCodeword: function addCodeword() {
      this.codewords.push(this.newCodeword);
      this.updateCodeword();
    },
    updateCodeword: function updateCodeword() {
      var _this2 = this;

      axios({
        method: 'post',
        url: '/codeword/updatecodeword',
        data: {
          CodeWordSetKey: this.CodeWordSetName,
          updatedCodewords: this.codewords
        },
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this2.getCodeWords();
      });
    },
    selectCodewordSet: function selectCodewordSet(setName) {
      this.CodewordSetName = setName;
    }
  }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert2__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* global axios $ */
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'CourseStudent',
  data: function data() {
    return {
      courseNameData: '',
      courseStudentData: [],
      courseData: '',
      coursesData: '',
      selectCourseName: '',
      selectEmailKey: '',
      selectstudentName: '',
      selectedEmailKey: '',
      selectedStudentName: '',
      acknowledged: 0,
      courseInfo: '',
      studentInfo: '',
      editStudentName: '',
      editStudentEmail: '',
      editStudentId: '',
      currentPage: '',
      pages: '',
      prevUrl: '',
      nextUrl: '',
      totalStudents: ''
    };
  },
  created: function created() {
    if (this.$route.params.courseName == null) {
      this.courseNameData = window.localStorage.getItem('courseName');
      this.getCourseStudentData();
      this.getCoursesData(this.courseNameData);
    } else {
      this.courseNameData = this.$route.params.courseName;
      window.localStorage.setItem('courseName', this.courseNameData);
      this.getCourseStudentData();
      this.getCoursesData(this.courseNameData);
    }
  },

  methods: {
    changeEndDate: function changeEndDate() {
      var start = new Date(document.getElementById('startDate').value);
      this.courseInfo.Startdate = new Date(start) && new Date(start).toISOString().split('T')[0];
      this.courseInfo.Enddate = new Date(start.setMonth(start.getMonth())) && new Date(start.setMonth(start.getMonth() + 4)).toISOString().split('T')[0];
      document.getElementById('endDate').value = this.courseInfo.Enddate;
    },
    getCourseStudentData: function getCourseStudentData() {
      var _this = this;

      axios({
        method: 'post',
        url: 'codeword/getcoursestudent',
        data: {
          CourseNameValue: this.courseNameData
        },
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this.courseStudentData = response.data.courseStudents;
        _this.currentPage = response.data.currentPage;
        _this.pages = response.data.pages;
        _this.nextUrl = response.data.nextUrl;
        _this.prevUrl = response.data.prevUrl;
        _this.totalStudents = response.data.totalStudents;
        _this.acknowledged = response.data.Acknowledged;
      });
    },
    checkPage: function checkPage(url) {
      var _this2 = this;

      axios({
        method: 'post',
        url: url,
        data: {
          CourseNameValue: this.courseNameData
        },
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this2.courseStudentData = response.data.courseStudents;
        _this2.currentPage = response.data.currentPage;
        _this2.pages = response.data.pages;
        _this2.nextUrl = response.data.nextUrl;
        _this2.prevUrl = response.data.prevUrl;
      });
    },
    getCoursesData: function getCoursesData(courseNameData) {
      var _this3 = this;

      axios({
        method: 'get',
        url: 'codeword/getCourseList',
        headers: {
          token: window.localStorage.getItem('token')
        }
      }).then(function (response) {
        _this3.coursesData = response.data.data;
        for (var index = 0; index < _this3.coursesData.length; index++) {
          if (_this3.coursesData[index].courseNameKey === courseNameData) {
            _this3.courseData = _this3.coursesData[index];
          }
        }
        console.log(_this3.coursesData.length + _this3.coursesData[0].PostSurveyURL);
      });
    },
    selectStudent: function selectStudent(courseName, emailKey, studentName) {
      this.selectCourseName = courseName;
      this.selectEmailKey = emailKey;
      this.selectstudentName = studentName;
      this.selectedEmailKey = emailKey;
      this.selectedStudentName = studentName;
    },
    deleteStudent: function deleteStudent(courseName, emailKey) {
      var _this4 = this;

      axios({
        method: 'post',
        url: 'codeword/deletecoursestudent',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          CourseNameKey: courseName,
          EmailKey: emailKey
        }
      }).then(function (response) {
        if (response.data.message === 'Deleted Student Successfully!') {
          __WEBPACK_IMPORTED_MODULE_0_sweetalert2___default()('Success', response.data.message, 'success');
          $('#deleteStudent').modal('hide');
          _this4.getCourseStudentData();
          _this4.getCoursesData(_this4.courseNameData);
        }
      });
    },
    editStudent: function editStudent(studentId, selectEmailKey, selectStudent) {
      var _this5 = this;

      axios({
        method: 'post',
        url: 'codeword/updatecoursestudent',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          _id: studentId,
          NewEmailKey: selectEmailKey,
          Newstudentkey: selectStudent
        }
      }).then(function (response) {
        if (response.data.message === true) {
          $('#editStudent').modal('hide');
          _this5.getCourseStudentData();
          _this5.getCoursesData(_this5.courseNameData);
        }
      });
    },
    editCourse: function editCourse(courseId) {
      axios({
        method: 'post',
        url: 'codeword/updateCourse',
        headers: {
          token: window.localStorage.getItem('token')
        },
        data: {
          id: courseId,
          Startdate: this.courseInfo.Startdate,
          Enddate: this.courseInfo.Enddate,
          PreSurveyURL: this.courseInfo.PreSurveyURL,
          PostSurveyURL: this.courseInfo.PostSurveyURL
        }
      }).then(function (response) {
        $('#editCourse').modal('hide');
      });
    },
    selectCourse: function selectCourse(courseDetails) {
      this.courseInfo = courseDetails;
    },
    selectStudentInfo: function selectStudentInfo(studentDetails) {
      this.editStudentName = studentDetails.StudentName;
      this.editStudentEmail = studentDetails.EmailKey;
      this.editStudentId = studentDetails._id;
    }
  }
});

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_routes__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuelidate__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bootstrap_css_only_css_bootstrap_min_css__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bootstrap_css_only_css_bootstrap_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_bootstrap_css_only_css_bootstrap_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mdbvue_build_css_mdb_css__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_mdbvue_build_css_mdb_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_mdbvue_build_css_mdb_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__store__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vue_sweetalert2__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_jquery__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.














window.jQuery = __WEBPACK_IMPORTED_MODULE_11_jquery___default.a;
window.$ = __WEBPACK_IMPORTED_MODULE_11_jquery___default.a;
window.axios = __WEBPACK_IMPORTED_MODULE_4_axios___default.a.create({
  baseURL: "https://gdpcodeword.herokuapp.com/",
  timeout: 1000
});
window.$ = __webpack_require__(5);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_9_vue_sweetalert2__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_3_vuelidate___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__webpack_require__(119);
__webpack_require__(121);
/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router_routes__["a" /* default */],
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */] },
  template: '<App/>',
  store: __WEBPACK_IMPORTED_MODULE_7__store__["a" /* store */]
});

/***/ }),
/* 29 */,
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_537fce3d_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(37);
function injectStyle (ssrContext) {
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_537fce3d_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Navbar_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_166124a1_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Navbar_vue__ = __webpack_require__(36);
function injectStyle (ssrContext) {
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Navbar_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_166124a1_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Navbar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    user () {
      return this.$store.state.user
    },
    check () {
      console.log(localStorage.getItem('token'))
      return localStorage.getItem('token') // get token from localStorage
    }
  });

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"navbar navbar-expand-lg navbar-dark bg-dark fixed-top",attrs:{"id":"mainNav"}},[_c('div',{staticClass:"container"},[_c('a',{staticClass:"navbar-brand",attrs:{"href":"/"}},[_vm._v("Code Word")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbarResponsive"}},[(!_vm.auth)?_c('ul',{staticClass:"navbar-nav ml-auto"},[_c('li',{staticClass:"nav-item"},[_c('router-link',{attrs:{"to":"/signup"}},[_vm._v("Sign Up")])],1),_vm._v(" "),_c('li',{staticClass:"nav-item"},[_c('router-link',{attrs:{"to":"/"}},[_vm._v("Sign In")])],1)]):_vm._e(),_vm._v(" "),(_vm.auth)?_c('ul',{staticClass:"navbar-nav ml-auto"},[(this.$route.name != "StudentDashboard" && this.$route.name !== "ChangePassword")?_c('li',{staticClass:"nav-item"},[_c('router-link',{attrs:{"to":"/instructordashboard"}},[_vm._v("Dashboard")])],1):_vm._e(),_vm._v(" "),(this.$route.name != "StudentDashboard" && this.$route.name !== "ChangePassword")?_c('li',{staticClass:"nav-item"},[_c('router-link',{attrs:{"to":"/codewordset"}},[_vm._v("CodeWord Set")])],1):_vm._e(),_vm._v(" "),_c('li',{staticClass:"nav-item dropdown"},[_c('div',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"id":"dropdownMenuButton","data-toggle":"dropdown"}},[_vm._v("\n                  "+_vm._s(_vm.email)+"\n                  ")]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"dropdownMenuButton"}},[_c('a',{staticClass:"dropdown-item",on:{"click":function($event){$event.preventDefault();return _vm.onLogout($event)}}},[_vm._v("Logout")])])])])]):_vm._e()])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"navbar-toggler collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbarResponsive","aria-controls":"navbarResponsive","aria-expanded":"false","aria-label":"Toggle navigation"}},[_c('span',{staticClass:"navbar-toggler-icon"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('div',[_c('Navbar'),_vm._v(" "),_c('router-view')],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_User_SignIn__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_User_SignUp__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_InstructorDashboard__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_User_ForgetPassword__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_User_ChangePassword__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_StudentDashboard__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_CodeWordSet__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_CodeWord__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_CourseStudent__ = __webpack_require__(85);











__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  linkExactActiveClass: 'active',
  routes: [{
    path: '/',
    beforeEnter: function beforeEnter(to, from, next) {
      var logged = localStorage.getItem('status');
      console.log(logged + 'logged status');
      if (logged !== null) {
        if (logged) {
          console.log('instructordashboard');
          next('/instructordashboard');
        } else {
          console.log('studentdashboard');
          next('/studentdashboard');
        }
      }
      next();
    },

    name: 'SignIn',
    component: __WEBPACK_IMPORTED_MODULE_2__components_User_SignIn__["a" /* default */]
  }, {
    path: '/signup',
    name: 'Signup',
    component: __WEBPACK_IMPORTED_MODULE_3__components_User_SignUp__["a" /* default */]
  }, {
    path: '/instructordashboard',
    name: 'InstructorDashboard',
    component: __WEBPACK_IMPORTED_MODULE_4__components_InstructorDashboard__["a" /* default */],
    meta: {
      role: 'instructor'
    }
  }, {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: __WEBPACK_IMPORTED_MODULE_5__components_User_ForgetPassword__["a" /* default */]
  }, {
    path: '/changepassword',
    name: 'ChangePassword',
    component: __WEBPACK_IMPORTED_MODULE_6__components_User_ChangePassword__["a" /* default */]
  }, {
    path: '/coursestudent',
    name: 'CourseStudent',
    component: __WEBPACK_IMPORTED_MODULE_10__components_CourseStudent__["a" /* default */]
  }, {
    path: '/codewordset',
    name: 'CodeWordSet',
    component: __WEBPACK_IMPORTED_MODULE_8__components_CodeWordSet__["a" /* default */]
  }, {
    path: '/codeword',
    name: 'CodeWord',
    component: __WEBPACK_IMPORTED_MODULE_9__components_CodeWord__["a" /* default */]
  }, {
    path: '/studentdashboard',
    name: 'StudentDashboard',
    component: __WEBPACK_IMPORTED_MODULE_7__components_StudentDashboard__["a" /* default */],
    meta: {
      role: 'student'
    }
  }]
}));

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SignIn_vue__ = __webpack_require__(11);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36d2d53d_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignIn_vue__ = __webpack_require__(42);
function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-36d2d53d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SignIn_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_36d2d53d_hasScoped_true_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignIn_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-4 col-xs-0 col-sm-0"}),_vm._v(" "),_c('div',{staticClass:"col-md-4 col-xs-12 col-sm-12"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.signIn($event)}}},[(_vm.signed && _vm.msg)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.msg)+"\n                ")]):(!_vm.signed && _vm.msg)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.msg)+"\n                ")]):_vm._e(),_vm._v(" "),_c('h2',[_vm._v(" Login")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('button',{staticClass:"btn btn-success  btn-sm btn-block",attrs:{"type":"submit"}},[_vm._v("Sign In")]),_vm._v(" "),_c('div',{staticClass:"text-right forgetpassword"},[_c('router-link',{attrs:{"to":"/forgetpassword"}},[_vm._v("Forget Password?")])],1),_vm._v(" "),_c('div',{staticClass:"text-right"},[_c('p',[_vm._v(" New to CodeWord? "),_c('router-link',{attrs:{"to":"/signup"}},[_vm._v("Register")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"col-md-4 col-xs-0 col-sm-0"})])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group row "},[_c('label',{attrs:{"for":"inputEmail"}},[_vm._v("Email Address")]),_vm._v(" "),_c('input',{staticClass:"form-control",attrs:{"type":"text","name":"emailID","id":"inputEmail","placeholder":"Email ID"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group row"},[_c('label',{attrs:{"for":"inputPassword"}},[_vm._v("Password")]),_vm._v(" "),_c('input',{staticClass:"form-control",attrs:{"type":"password","name":"password","id":"inputPassword","placeholder":"Password"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SignUp_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d3f2f80_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignUp_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d3f2f80_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignUp_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d3f2f80_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignUp_vue__);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SignUp_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d3f2f80_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SignUp_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:1285)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:\"container \"},[_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\"col-md-4 col-xs-0 col-sm-0\"}),_vm._v(\" \"),_c('div',{staticClass:\"col-md-4 col-xs-12 col-sm-12\",staticStyle:{\"margin-top\":\"5em\"}},[_c('div',{staticClass:\"card\"},[_c('div',{staticClass:\"card-body\"},[_c('form',{on:{\"submit\":function($event){$event.preventDefault();return _vm.OnRegister($event)}}},[(_vm.signed && _vm.msg)?_c('div',{staticClass:\"alert alert-success\",attrs:{\"role\":\"alert\"}},[_vm._v(\"\\n                    \"+_vm._s(_vm.msg)+\"\\n                     \")]):(!_vm.signed && _vm.msg)?_c('div',{staticClass:\"alert alert-danger\",attrs:{\"role\":\"alert\"}},[_vm._v(\"\\n                    \"+_vm._s(_vm.msg)+\"\\n                    \")]):_vm._e(),_vm._v(\" \"),_c('h2',[_vm._v(\" Register\")]),_vm._v(\" \"),_c('div',{staticClass:\"form-group\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.email),expression:\"email\"}],staticClass:\"form-control\",attrs:{\"type\":\"email\",\"placeholder\":\"Enter email\",\"required\":\"required\",\"pattern\":\".+@nwmissouri.edu\"},domProps:{\"value\":(_vm.email)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.email=$event.target.value}}})]),_vm._v(\" \"),_c('div',{staticClass:\"form-group\",class:{invalid: _vm.$v.password.$error}},[_c('input',{directives:[{name:\"model\",rawName:\"v-model.lazy\",value:(_vm.password),expression:\"password\",modifiers:{\"lazy\":true}}],staticClass:\"form-control\",attrs:{\"type\":\"password\",\"placeholder\":\"Password\",\"required\":\"\",\"pattern\":\"(?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\",\"title\":\"Must contain at least one number and one uppercase and lowercase letter\"},domProps:{\"value\":(_vm.password)},on:{\"blur\":function($event){return _vm.$v.password.$touch()},\"change\":function($event){_vm.password=$event.target.value}}}),_vm._v(\" \"),(!_vm.$v.password.minLength)?_c('p',[_vm._v(\" Password must have at least \"+_vm._s(_vm.$v.password.$params.minLength.min)+\" letters. \")]):_vm._e()]),_vm._v(\" \"),_c('div',{staticClass:\"form-group\",class:{invalid: _vm.$v.repeatPassword.$error}},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.repeatPassword),expression:\"repeatPassword\"}],staticClass:\"form-control\",attrs:{\"type\":\"password\",\"placeholder\":\"Confirm Password\"},domProps:{\"value\":(_vm.repeatPassword)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.repeatPassword=$event.target.value}}}),_vm._v(\" \"),(!_vm.$v.repeatPassword.sameAsPassword)?_c('p',[_vm._v(\" Password must be identical. \")]):_vm._e()]),_vm._v(\" \"),_c('div',{staticClass:\"form-group\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.instructor),expression:\"instructor\"}],attrs:{\"type\":\"checkbox\",\"id\":\"instructor\"},domProps:{\"checked\":Array.isArray(_vm.instructor)?_vm._i(_vm.instructor,null)>-1:(_vm.instructor)},on:{\"change\":function($event){var $$a=_vm.instructor,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.instructor=$$a.concat([$$v]))}else{$$i>-1&&(_vm.instructor=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.instructor=$$c}}}}),_vm._v(\" \"),_c('label',{attrs:{\"for\":\"terms\"}},[_vm._v(\"Instructor\")])]),_vm._v(\" \"),_vm._m(0),_vm._v(\" \"),_c('div',{staticClass:\"text-center\"},[_vm._v(\"Already have an account?\"),_c('router-link',{attrs:{\"to\":\"/\"}},[_vm._v(\"Sign in\")])],1)])])])]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-4 col-xs-0 col-sm-0\"})])])])}\n| var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"form-group\"},[_c('button',{staticClass:\"btn btn-success btn-sm btn-block\",attrs:{\"type\":\"submit\"}},[_vm._v(\"Register Now\")])])}]\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InstructorDashboard_vue__ = __webpack_require__(15);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f261791_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InstructorDashboard_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f261791_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InstructorDashboard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f261791_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InstructorDashboard_vue__);
function injectStyle (ssrContext) {
  __webpack_require__(69)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InstructorDashboard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f261791_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InstructorDashboard_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:4090)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"container-fluid\",staticStyle:{\"margin-top\":\"5em\"}},[_c('div',{staticClass:\"col-md-12 col-lg-12 col-xs-2 col-sm-2\"},[_c('div',{staticClass:\"coursebutton\"},[_c('button',{staticClass:\"btn btn-success\",attrs:{\"type\":\"button\",\"title\":\"Create CodeWord Set\",\"data-toggle\":\"modal\",\"data-target\":\"#addcourse\"},on:{\"click\":_vm.loadCourseModel}},[_c('span',{staticClass:\"fa fa-plus\"}),_vm._v(\" Add Course \")])]),_vm._v(\" \"),_c('div',{staticClass:\"togglealign\"},[_c('toggle-button',{attrs:{\"id\":\"changed-font\",\"color\":{checked: 'green', unchecked: 'red', disabled: '#CCCCCC'},\"width\":185,\"height\":45,\"labels\":{checked: 'Active Courses', unchecked: 'InActive Courses'}},model:{value:(_vm.isEnabled),callback:function ($$v) {_vm.isEnabled=$$v},expression:\"isEnabled\"}})],1)]),_vm._v(\" \"),_c('div',{staticClass:\"row\",staticStyle:{\"margin-left\":\"3rem\",\"margin-right\":\"7rem\"}},_vm._l((_vm.coursesData),function(course){return (!_vm.isEnabled != (new Date() < new Date(course.Enddate)))?_c('div',{key:course._id,staticClass:\"col-md-3 col-lg-3 col-xs-0 col-sm-0\"},[_c('div',{staticClass:\"card border-success mb-3 cardstyle\",staticStyle:{\"max-width\":\"20rem\",\"margin-top\":\"1rem\"}},[_c('div',{staticClass:\"card-header bg-info border-success\",attrs:{\"id\":\"boldforcourse\"}},[_c('h4',[_vm._v(_vm._s(course.courseNameKey))]),_vm._v(\" \"),_c('br'),_vm._v(\" \"),_c('div',[_vm._v(\"\\r\\n         \"+_vm._s(course.Startdate)+\"    \"+_vm._s(course.Enddate)+\" \\r\\n       \")])]),_vm._v(\" \"),_c('div',{staticClass:\"card-body text-info\"},[_c('h5',{staticClass:\"card-title\"}),_vm._v(\" \"),_c('br'),_vm._v(\" \"),_c('a',{staticClass:\"card-link\",attrs:{\"href\":'http://'+course.PreSurveyURL,\"target\":\"_blank\"}},[_vm._v(\"Start Survey\")]),_vm._v(\" \"),_c('a',{staticClass:\"card-link\",attrs:{\"href\":'http://'+course.PostSurveyURL,\"target\":\"_blank\"}},[_vm._v(\"End Survey\")]),_vm._v(\" \"),_c('br'),_vm._v(\" \"),_c('router-link',{attrs:{\"to\":{ name: 'CourseStudent', params: { courseName: course.courseNameKey } }}},[_c('button',{staticClass:\"btn \"},[_c('i',{staticClass:\"fa fa-eye fa-lg\",attrs:{\"aria-hidden\":\"true\"}})])]),_vm._v(\" \"),_c('button',{staticClass:\"btn\",attrs:{\"data-toggle\":\"modal\",\"data-target\":\"#deleteCourse\"},on:{\"click\":function($event){return _vm.getCourseName(course.courseNameKey)}}},[_c('i',{staticClass:\"fa fa-trash fa-lg\"})])],1)])]):_vm._e()}),0),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"deleteCourse\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(0),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('h1',[_vm._v(\" \"+_vm._s(_vm.selectedCourse)+\" \")])]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primart\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\"},on:{\"click\":_vm.deleteCourseKey}},[_vm._v(\"Delete Course\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"addcourse\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"addcourseLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\",staticStyle:{\"width\":\"fit-content\"}},[_vm._m(1),_vm._v(\" \"),_c('form',{on:{\"submit\":function($event){$event.preventDefault();return _vm.CreateCourse($event)}}},[_c('div',{staticClass:\"modal-body\"},[_vm._m(2),_vm._v(\" \"),_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\"col tooltip-test\",attrs:{\"title\":\"Start Date\"}},[_vm._v(\" Start Date:\"),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.startDate),expression:\"startDate\"}],staticClass:\"form-control\",attrs:{\"type\":\"date\",\"name\":\"startDate\",\"placeholder\":\"Start Date\",\"required\":\"\"},domProps:{\"value\":(_vm.startDate)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.startDate=$event.target.value}}})]),_vm._v(\" \"),_c('div',{staticClass:\"col tooltip-test\",attrs:{\"title\":\"End Date\"}},[_vm._v(\" End Date:\"),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.endDate),expression:\"endDate\"}],staticClass:\"form-control\",attrs:{\"type\":\"date\",\"name\":\"endDate\",\"disabled\":true,\"placeholder\":\"End Date\",\"required\":\"\"},domProps:{\"value\":(_vm.endDate)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.endDate=$event.target.value}}})])]),_vm._v(\" \"),_c('div',{staticClass:\"form-group\"},[_c('input',{ref:\"file\",staticClass:\"form-control-file\",staticStyle:{\"margin-top\":\"1em\"},attrs:{\"type\":\"file\",\"name\":\"file\",\"id\":\"file\",\"required\":\"\"},on:{\"change\":function($event){return _vm.handleFileUpload()}}}),_vm._v(\"\\r\\n                Upload Student Details(Excel)\\r\\n            \")]),_vm._v(\" \"),(_vm.checkFileUpload === true)?_c('div',[(_vm.count === 0)?_c('p',{staticClass:\"alert alert-danger\"},[_vm._v(\"                          \\r\\n                    No data in excel. Please upload new excel file.\")]):(_vm.count === false)?_c('p',{staticClass:\"alert alert-danger\"},[_vm._v(\"\\r\\n                    Uploaded excel sheet was not in the format.\")]):_c('p',{staticClass:\"alert alert-info\"},[_vm._v(\"\\r\\n                    There are \"+_vm._s(_vm.count)+\" Students in the Uploaded set.\")])]):_vm._e(),_vm._v(\" \"),_c('div',{staticClass:\"form-group\",attrs:{\"required\":\"\"}},[_c('select',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.CodeWordSetName),expression:\"CodeWordSetName\"}],staticClass:\"form-control\",attrs:{\"value\":\"Select codeword set\",\"data-toggle\":\"tooltip\",\"title\":\"Please select codeword set\"},on:{\"change\":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = \"_value\" in o ? o._value : o.value;return val}); _vm.CodeWordSetName=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option',{attrs:{\"disabled\":\"\",\"value\":\"\"}},[_vm._v(\"Please select CodeWordSet\")]),_vm._v(\" \"),_vm._l((_vm.codeWordSetData),function(codewordset){return _c('option',{key:codewordset._id},[_vm._v(_vm._s(codewordset.CodeWordSetName))])})],2)]),_vm._v(\" \"),_vm._m(3),_vm._v(\" \"),_vm._m(4),_vm._v(\" \"),_c('div',[_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"cancel\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"create\",\"disabled\":_vm.count === false || _vm.count === 0}},[_vm._v(\"Create Course\")])])])])])])])])}\n| var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"exampleModalLabel\"}},[_vm._v(\"Delete Course\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"addcourseLabel\"}},[_vm._v(\"New Course Details\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"form-group\"},[_c('input',{staticClass:\"form-control\",attrs:{\"type\":\"text\",\"pattern\":\".{6,15}\",\"id\":\"courseName\",\"name\":\"courseName\",\"placeholder\":\"Enter Course Name\",\"data-toggle\":\"tooltip\",\"onKeyDown\":\"if(this.value.length==15) return false;\",\"title\":\"Atleast 6-15 characters\",\"required\":\"\"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"form-group\"},[_c('input',{staticClass:\"form-control\",attrs:{\"type\":\"text\",\"placeholder\":\"Enter Survey Start URL\",\"name\":\"startSurveyurl\",\"data-toggle\":\"tooltip\",\"data-placement\":\"bottom\",\"title\":\"Enter Survey Start URL\"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"form-group\"},[_c('input',{staticClass:\"form-control\",attrs:{\"type\":\"text\",\"placeholder\":\"Enter Survey End URL\",\"name\":\"endSurveyurl\",\"data-toggle\":\"tooltip\",\"data-placement\":\"bottom\",\"title\":\"Enter Survey End URL\"}})])}]\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ForgetPassword_vue__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00574910_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ForgetPassword_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00574910_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ForgetPassword_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00574910_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ForgetPassword_vue__);
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ForgetPassword_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_00574910_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ForgetPassword_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 72 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:1166)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"container\"},[_c('div',{staticClass:\"row\",staticStyle:{\"margin-top\":\"7em\"}},[_c('div',{staticClass:\"col-md-3 col-lg-3 col-xs-1 col-sm-1\"}),_vm._v(\" \"),_c('div',{staticClass:\"card col-md-4 col-lg-4 col-xs-12 col-sm-12\"},[_c('div',{staticClass:\"card-body\"},[_c('h3',[_vm._v(\" Reset your password \")]),_vm._v(\" \"),_c('div',{staticStyle:{\"text-align\":\"center\"}}),_vm._v(\" \"),_c('div',[(_vm.signed && _vm.msg)?_c('div',{staticClass:\"alert alert-success\",attrs:{\"role\":\"alert\"}},[_vm._v(\" \"+_vm._s(_vm.msg)+\" \")]):(!_vm.signed && _vm.msg)?_c('div',{staticClass:\"alert alert-danger\",attrs:{\"role\":\"alert\"}},[_vm._v(\" \"+_vm._s(_vm.msg)+\" \")]):_vm._e(),_vm._v(\" \"),_c('form',[_c('div',{staticClass:\"form-group\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.email),expression:\"email\"}],staticClass:\"form-control\",attrs:{\"type\":\"email\",\"placeholder\":\"Enter email\",\"required\":\"required\",\"pattern\":\".+@*.edu\"},domProps:{\"value\":(_vm.email)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.email=$event.target.value}}})]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-success btn-sm btn-block\",attrs:{\"type\":\"button\"},on:{\"click\":_vm.forget}},[_vm._v(\"Send password reset email\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-3 col-lg-3 col-xs-1 col-sm-1\"})])])}\n| var staticRenderFns = []\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ChangePassword_vue__ = __webpack_require__(18);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b5dbe0f_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ChangePassword_vue__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b5dbe0f_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ChangePassword_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b5dbe0f_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ChangePassword_vue__);
function injectStyle (ssrContext) {
  __webpack_require__(74)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ChangePassword_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4b5dbe0f_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ChangePassword_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:1384)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:\"container \"},[_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\"col-md-4 col-xs-0 col-sm-0\"}),_vm._v(\" \"),_c('div',{staticClass:\"col-md-5 col-xs-8 col-sm-8\",staticStyle:{\"margin-top\":\"6em\"}},[_c('div',{staticClass:\"card\"},[_c('div',{staticClass:\"card-body\"},[_c('h2',[_vm._v(\" Change Password\")]),_vm._v(\" \"),(_vm.changed && _vm.msg)?_c('div',{staticClass:\"alert alert-success\",attrs:{\"role\":\"alert\"}},[_vm._v(\" \"+_vm._s(_vm.msg)+\" \")]):_vm._e(),_vm._v(\" \"),_c('form',{on:{\"submit\":function($event){$event.preventDefault();return _vm.changePassword($event)}}},[_c('div',{staticClass:\"form-group row\"},[_c('label',{staticClass:\"col-lg-5 col-form-label\",attrs:{\"for\":\"inputPassword\"}},[_vm._v(\"New Password:\")]),_vm._v(\" \"),_c('div',{staticClass:\"col-lg-7\",class:{invalid: _vm.$v.newpassword.$error}},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.newpassword),expression:\"newpassword\"}],staticClass:\"form-control\",attrs:{\"type\":\"password\",\"placeholder\":\"New Password\",\"required\":\"\",\"pattern\":\"(?=.*\\\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\"},domProps:{\"value\":(_vm.newpassword)},on:{\"blur\":function($event){return _vm.$v.newpassword.$touch()},\"input\":function($event){if($event.target.composing){ return;_vm.newpassword=$event.target.value}}}),_vm._v(\" \"),(!_vm.$v.newpassword.minLength)?_c('p',[_vm._v(\" Password must have at least \"+_vm._s(_vm.$v.newpassword.$params.minLength.min)+\" letters. \")]):_vm._e()])]),_vm._v(\" \"),_c('div',{staticClass:\"form-group row\"},[_c('label',{staticClass:\"col-lg-5 col-form-label\",attrs:{\"for\":\"inputPassword\"}},[_vm._v(\"Confirm Password:\")]),_vm._v(\" \"),_c('div',{staticClass:\"col-lg-7\",class:{invalid: _vm.$v.repeatPassword.$error}},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.repeatPassword),expression:\"repeatPassword\"}],staticClass:\"form-control\",attrs:{\"type\":\"password\",\"placeholder\":\"Confirm Password\"},domProps:{\"value\":(_vm.repeatPassword)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.repeatPassword=$event.target.value}}}),_vm._v(\" \"),(!_vm.$v.repeatPassword.sameAsPassword)?_c('p',[_vm._v(\" Password must be identical. \")]):_vm._e()])]),_vm._v(\" \"),_c('div',{staticClass:\"form-group row\"},[_c('label',{staticClass:\"col-lg-5 col-form-label\",attrs:{\"for\":\"changePassword\"}}),_vm._v(\" \"),_c('div',{staticClass:\"col-lg-7\"},[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"submit\",\"disabled\":this.$v.$invalid}},[_vm._v(\"Change Password\")])])])])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-3 col-lg-3 col-xs-1 col-sm-1\"})])])}\n| var staticRenderFns = []\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StudentDashboard_vue__ = __webpack_require__(19);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6cce3c88_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_StudentDashboard_vue__ = __webpack_require__(78);
function injectStyle (ssrContext) {
  __webpack_require__(77)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_StudentDashboard_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6cce3c88_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_StudentDashboard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container",staticStyle:{"margin-top":"5em"}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-2 col-lg-2 col-xs-0 col-sm-0"}),_vm._v(" "),_c('div',{staticClass:"table-responsive col-md-8 col-lg-8 col-xs-12 col-sm-12"},[_c('h2',[_vm._v("List of courses registered")]),_vm._v(" "),_c('table',{staticClass:"table col-md-12 col-lg-12 col-xs-12 col-sm-12 table-striped table-bordered table-hover"},[_vm._m(0),_vm._v(" "),(_vm.status)?_c('tbody',_vm._l((_vm.userCourses),function(course,index){return _c('tr',{key:index},[_c('td',[_vm._v(_vm._s(course.CourseNameKey))]),_vm._v(" "),_c('td',[(!course.Acknowledged)?_c('input',{attrs:{"type":"button","Value":"Get CodeWord"},on:{"click":function($event){return _vm.getCodeWord(index)}}}):_c('div',[_vm._v(" "+_vm._s(course.Codeword))])]),_vm._v(" "),_vm._m(1,true),_vm._v(" "),_vm._m(2,true)])}),0):_c('div',{staticClass:"nodata"},[_vm._v("\n        No Courses Found\n      ")])]),_vm._v(" "),_c('div',{staticClass:"col-md-2 col-lg-2 col-xs-0 col-sm-0"})])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-dark"},[_c('tr',[_c('th',[_vm._v("Course Name")]),_vm._v(" "),_c('th',[_vm._v("Codeword")]),_vm._v(" "),_c('th',[_vm._v("Start Survey")]),_vm._v(" "),_c('th',[_vm._v("End Survey")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',[_c('a',[_vm._v(" Click Here ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',[_c('a',[_vm._v(" Click Here ")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeWordSet_vue__ = __webpack_require__(20);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59094034_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWordSet_vue__ = __webpack_require__(81);
function injectStyle (ssrContext) {
  __webpack_require__(80)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeWordSet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_59094034_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWordSet_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid",staticStyle:{"margin-top":"5em"},attrs:{"id":"codeWordSet"}},[_c('div',{staticClass:"col-md-4 col-lg-4 col-xs-0 col-sm-0"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addcodeword","tabindex":"-1","role":"dialog","aria-labelledby":"addcourseLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content",staticStyle:{"width":"fit-content"}},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title",attrs:{"id":"addcourseLabel"}},[_vm._v("Create Codeword Set")]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('b-popover',{attrs:{"target":"exPopover3","triggers":"click","placement":"auto"}},[_c('template',{slot:"title"},[_vm._v("Rules for Creating Codewords")]),_vm._v(" "),_c('strong',[_vm._v("1.")]),_vm._v(" Every codeword should be unique in the set."),_c('br'),_vm._v(" "),_c('strong',[_vm._v("2.")]),_vm._v(" The codewords with substring should differ by at least 3 letters."),_c('br'),_vm._v(" "),_c('strong',[_vm._v("3.")]),_vm._v(" There should not be any codewords like Ex: daa , baa."),_c('br'),_vm._v(" "),_c('strong',[_vm._v("4.")]),_vm._v(" Scan the codewords as soon as the upload is done and give the feedback."),_c('br'),_vm._v(" "),_c('strong',[_vm._v("5.")]),_vm._v(" Every codeword should be compared with every other codeword in the set.\r\n                      ")],2)],1),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.saveCodeWordData($event)}}},[_c('div',{staticClass:"modal-body"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"form-group text-left"},[_vm._v("\r\n                                Upload Cordword Set(Excel)\r\n                                "),_c('input',{ref:"myFile",staticClass:"form-control-file",staticStyle:{"margin-top":".2em"},attrs:{"type":"file","name":"file","id":"exampleFormControlFile1","required":""},on:{"change":_vm.previewFiles}})]),_vm._v(" "),_c('div',{staticClass:"alert alert-info"},[(_vm.count === 0)?_c('p',[_vm._v("                          \r\n                                 No File is uploaded. Waiting for user to upload the CodeWord Set.")]):(_vm.count === false)?_c('p',[_vm._v("\r\n                                    Codeword is not 5 letter Please upload another excel.")]):_c('p',[_vm._v("\r\n                                    There are "+_vm._s(_vm.count)+" codewords in the Uploaded set.")])])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-danger",attrs:{"type":"cancel","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-success",attrs:{"type":"create","disabled":_vm.count === false || _vm.count === 0}},[_vm._v("Create")])])])])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive-md"},[_c('table',{staticClass:"table",attrs:{"id":"codewordsetTable"}},[_vm._m(3),_vm._v(" "),_c('tbody',_vm._l((_vm.codeWordTempSetData),function(code){return _c('tr',{key:code._id},[_c('td',[_vm._v(" "+_vm._s(code.CodeWordSetName)+" ")]),_vm._v(" "),_c('td',{attrs:{"id":"count"}},[_vm._v(_vm._s(code.Codewords.length))]),_vm._v(" "),(code.isPermanent !== true)?_c('td',[_c('router-link',{attrs:{"to":{ name: 'CodeWord', params: { CodeWordSetName: code.CodeWordSetName } }}},[_c('button',{staticClass:"btn btn-info btn-sm",attrs:{"type":"button","data-toggle":"tooltip","data-placement":"bottom","title":"Edit"}},[_c('i',{staticClass:"fa fa-pencil fa-xs"})])])],1):_vm._e(),_vm._v(" "),(code.isPermanent == true)?_c('td',[_c('router-link',{attrs:{"to":{ name: 'CodeWord', params: { CodeWordSetName: code.CodeWordSetName } }}},[_c('button',{staticClass:"btn btn-info btn-sm",attrs:{"type":"button","data-toggle":"tooltip","data-placement":"bottom","title":"Edit"}},[_c('i',{staticClass:"fa fa-eye fa-xs"})])])],1):_vm._e(),_vm._v(" "),_c('td',[(code.isPermanent !== true)?_c('button',{staticClass:"btn btn-info btn-sm",attrs:{"type":"button","data-toggle":"modal","data-target":"#deleteCodwordsetmodel"},on:{"click":function($event){return _vm.selectCodewordSet(code.CodeWordSetName)}}},[_c('i',{staticClass:"fa fa-trash fa-xs"})]):_vm._e()])])}),0)]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"deleteCodwordsetmodel","tabindex":"-1","role":"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(4),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('h1',[_vm._v(" "+_vm._s(_vm.CodewordSetName)+" ")])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-danger",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.codewordSetDelete()}}},[_vm._v("Delete Codeword Set")])])])])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-success",attrs:{"type":"button","title":"Create CodeWord Set","data-toggle":"modal","data-target":"#addcodeword"}},[_c('span',{staticClass:"fa fa-plus"}),_vm._v(" Create Codeword Set\r\n                ")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-outline-primary",attrs:{"id":"exPopover3"}},[_c('i',{staticClass:"fa fa-eye"}),_vm._v(" Hint")])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('input',{staticClass:"form-control",attrs:{"name":"dataSetName","pattern":".{5,}","type":"text","placeholder":"Enter Cordword Set Name","data-toggle":"tooltip","data-placement":"top","title":"Cordword Set Name atleast 5 letters","required":""}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:"thead-dark"},[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Codeword Set Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Count")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}}),_vm._v(" "),_c('th',{attrs:{"scope":"col"}})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title",attrs:{"id":"exampleModalLabel"}},[_vm._v("Delete Codeword")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Cancel"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeWord_vue__ = __webpack_require__(21);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8f4a1d6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWord_vue__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8f4a1d6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWord_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8f4a1d6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWord_vue__);
function injectStyle (ssrContext) {
  __webpack_require__(83)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeWord_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c8f4a1d6_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CodeWord_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 83 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:1348)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"container-fluid\",staticStyle:{\"margin-top\":\"5em\"},attrs:{\"id\":\"codeWord\"}},[_c('div',{staticClass:\"col-md-12 col-lg-12 col-xs-12 col-sm-12\"},[_c('div',{staticClass:\"codewordsetname\"},[_c('h3',[_vm._v(\"Codeword set Name: \"),_c('strong',[_vm._v(_vm._s(_vm.CodeWordSetName))])])]),_vm._v(\" \"),_c('div',{staticClass:\"codewordset\"},[(_vm.isPermanent !== true)?_c('button',{staticClass:\"btn btn-success\",staticStyle:{\"marging-left\":\"10px\"},attrs:{\"type\":\"button\",\"data-toggle\":\"modal\",\"data-target\":\"#addcodeword\"}},[_c('span',{staticClass:\"fa fa-plus\"}),_vm._v(\" Add Codeword\\n\")]):_vm._e()]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"addcodeword\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(0),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_vm._v(\"\\n        Enter new codeword: \"),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.newCodeword),expression:\"newCodeword\"}],attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.newCodeword)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.newCodeword=$event.target.value}}})]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"},on:{\"click\":function($event){return _vm.addCodeword()}}},[_vm._v(\"Add Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-4 col-lg-4 col-xs-4 col-sm-4 headingstyle\"},[_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"createcodeword\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"createcodewordLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(1),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('div',{staticClass:\"form-group text-left\"},[_vm._v(\"\\n      Upload Cordwords(Excel)\\n      \"),_c('input',{ref:\"myFile\",staticClass:\"form-control-file\",staticStyle:{\"margin-top\":\".2em\"},attrs:{\"type\":\"file\",\"name\":\"file\",\"id\":\"exampleFormControlFile1\",\"required\":\"\"}})])]),_vm._v(\" \"),_vm._m(2)])])])]),_vm._v(\" \"),_c('table',{staticClass:\"table\"},[_c('thead',{staticClass:\"thead-dark\"},[_c('tr',[_c('th',{attrs:{\"scope\":\"col\"}},[_vm._v(\"#\")]),_vm._v(\" \"),_c('th',{attrs:{\"scope\":\"col\"}},[_vm._v(\"Codewords\")]),_vm._v(\" \"),(_vm.isPermanent !== true)?_c('th',{attrs:{\"scope\":\"col\"}},[_vm._v(\"Options\")]):_vm._e()])]),_vm._v(\" \"),_c('tbody',_vm._l((_vm.codewords),function(codeword,index){return _c('tr',{key:codeword._id},[_c('td',{attrs:{\"scope\":\"row\"}},[_vm._v(_vm._s(index+1))]),_vm._v(\" \"),_c('td',[_vm._v(\" \"+_vm._s(codeword))]),_vm._v(\" \"),(_vm.isPermanent !== true)?_c('td',[_c('button',{staticClass:\"btn btn-info btn-sm\",staticStyle:{\"marging-left\":\"10px\"},attrs:{\"type\":\"button\",\"data-toggle\":\"modal\",\"data-target\":\"#editcodeword\"},on:{\"click\":function($event){return _vm.selectCodeword(index)}}},[_c('i',{staticClass:\"fas fa-pencil-alt\"})]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-info btn-sm\",staticStyle:{\"marging-left\":\"10px\"},attrs:{\"type\":\"button\",\"data-toggle\":\"modal\",\"data-target\":\"#deletecodeword\"},on:{\"click\":function($event){return _vm.selectCodeword(index)}}},[_c('i',{staticClass:\"fas fa-trash\"})]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"editcodeword\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(3,true),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_vm._v(\"\\n        Codeword: \"),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.selectedCodeword),expression:\"selectedCodeword\"}],attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.selectedCodeword)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.selectedCodeword=$event.target.value}}})]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"},on:{\"click\":function($event){return _vm.editCodeword(_vm.selectedCodeword, _vm.codewordIndex)}}},[_vm._v(\"Update Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"deletecodeword\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(4,true),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('h1',[_vm._v(\" \"+_vm._s(_vm.selectedCodeword)+\" \")])]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"},on:{\"click\":_vm.deleteCodeword}},[_vm._v(\"Delete Codeword\")])])])])])]):_vm._e()])}),0)])])])}\n| var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\"},[_vm._v(\"Add Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"createcodewordLabel\"}},[_vm._v(\"Add Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Close\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"}},[_vm._v(\"Add\")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\"},[_vm._v(\"Update Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"exampleModalLabel\"}},[_vm._v(\"Delete Codeword\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])}]\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CourseStudent_vue__ = __webpack_require__(22);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a836e20_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CourseStudent_vue__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a836e20_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CourseStudent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a836e20_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CourseStudent_vue__);
function injectStyle (ssrContext) {
  __webpack_require__(86)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CourseStudent_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a836e20_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_CourseStudent_vue__["default"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (1:5274)\nYou may need an appropriate loader to handle this file type.\n| var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"container-fluid\",staticStyle:{\"margin-top\":\"5em\"}},[_c('div',{staticClass:\"row\"},[_c('router-link',{attrs:{\"to\":{ name: 'InstructorDashboard' }}},[_c('button',{staticClass:\"btn btn-primary btn-xs\",staticStyle:{\"float\":\"left\"},attrs:{\"type\":\"button\"}},[_c('i',{staticClass:\"fa fa-chevron-left fa-lg\"}),_vm._v(\" DashBoard\")])])],1),_vm._v(\" \"),_c('div',{staticClass:\"card\"},[_c('h5',{staticClass:\"card-header\"},[_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\"col-md-6 col-lg-6 col-xs-0 col-sm-0\"},[_c('h3',{staticStyle:{\"font-weight\":\"bold\",\"text-align\":\"left\"}},[_vm._v(\" Course Name: \"+_vm._s(_vm.courseNameData)+\" \")])]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-6 col-lg-6 col-xs-0 col-sm-0\"},[_c('h3',{staticStyle:{\"font-weight\":\"bold\",\"text-align\":\"right\"}},[_vm._v(\" Acknowledged Status: \"+_vm._s(_vm.acknowledged)+\"% \")])])])]),_vm._v(\" \"),_c('div',{staticClass:\"card-body\"},[_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\"col-md-6 col-lg-6 col-xs-0 col-sm-0\",staticStyle:{\"text-align\":\"left\",\"font-weight\":\"bold\"}},[_vm._v(\"\\r\\n    Start Date: \"+_vm._s(_vm.courseData.Startdate)+\" \"),_c('br'),_vm._v(\"\\r\\n    End Date: \"+_vm._s(_vm.courseData.Enddate)+\" \"),_c('br'),_vm._v(\"\\r\\n    Start Survey URL: \"),_c('a',{staticClass:\"card-link\",attrs:{\"href\":'http://'+_vm.courseData.PreSurveyURL,\"target\":\"_blank\"}},[_vm._v(_vm._s(_vm.courseData.PreSurveyURL)+\" \")]),_vm._v(\" \"),_c('br'),_vm._v(\"\\r\\n    End Survey URL: \"),_c('a',{staticClass:\"card-link\",attrs:{\"href\":'http://'+_vm.courseData.PostSurveyURL,\"target\":\"_blank\"}},[_vm._v(_vm._s(_vm.courseData.PostSurveyURL)+\" \")]),_vm._v(\" \"),_c('br'),_vm._v(\"\\r\\n    Number of Students: \"+_vm._s(_vm.totalStudents)+\" \"),_c('br')]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-6 col-lg-6 col-xs-0 col-sm-0\",staticStyle:{\"text-align\":\"left\",\"font-weight\":\"bold\"}},[_c('button',{staticClass:\"btn\",staticStyle:{\"float\":\"right\"},attrs:{\"data-toggle\":\"modal\",\"data-target\":\"#editCourse\"},on:{\"click\":function($event){return _vm.selectCourse(_vm.courseData)}}},[_vm._v(\"Edit \"),_c('i',{staticClass:\"fa fa-pencil fa-xs\"})])])])])]),_vm._v(\" \"),_c('br'),_vm._v(\" \"),_c('br'),_vm._v(\" \"),_c('table',{staticClass:\"table table-striped table-sm\"},[_vm._m(0),_vm._v(\" \"),_c('tbody',_vm._l((_vm.courseStudentData),function(courseStudent){return _c('tr',{key:courseStudent._id},[_c('td',{attrs:{\"scope\":\"row\"}},[_vm._v(_vm._s(courseStudent.EmailKey))]),_vm._v(\" \"),_c('td',[_vm._v(_vm._s(courseStudent.StudentName))]),_vm._v(\" \"),_c('td',[_vm._v(_vm._s(courseStudent.Codeword))]),_vm._v(\" \"),_c('td',[_c('a',[_c('button',{staticClass:\"btn\",attrs:{\"data-toggle\":\"modal\",\"data-target\":\"#editStudent\"},on:{\"click\":function($event){return _vm.selectStudentInfo(courseStudent)}}},[_c('i',{staticClass:\"fa fa-pencil fa-xs\"})])])]),_vm._v(\" \"),_c('td',[_c('a',[_c('button',{staticClass:\"btn\",attrs:{\"data-toggle\":\"modal\",\"data-target\":\"#deleteStudent\"},on:{\"click\":function($event){return _vm.selectStudent(_vm.courseNameData, courseStudent.EmailKey, courseStudent.StudentName)}}},[_c('i',{staticClass:\"fa fa-trash fa-xs\"})])])])])}),0)]),_vm._v(\" \"),_c('div',[_c('p',{staticClass:\"text-center mb-0\"},[_vm._v(_vm._s(_vm.currentPage+1)+\" / \"+_vm._s(_vm.pages))]),_vm._v(\" \"),_c('ul',{staticClass:\"pagination justify-content-center\"},[_c('li',{staticClass:\"page-item\",class:{disabled: _vm.prevUrl === ''}},[_c('button',{staticClass:\"page-link\",on:{\"click\":function($event){return _vm.checkPage(_vm.prevUrl)}}},[_vm._v(\"Previous\")])]),_vm._v(\" \"),_c('li',{staticClass:\"page-item\",class:{disabled: _vm.nextUrl === ''}},[_c('button',{staticClass:\"page-link\",on:{\"click\":function($event){return _vm.checkPage(_vm.nextUrl)}}},[_vm._v(\"Next\")])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"deleteStudent\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(1),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('h5',[_vm._v(\" Student Name: \"+_vm._s(_vm.selectstudentName)+\" \")]),_vm._v(\" \"),_c('h6',[_vm._v(\" Student Email: \"+_vm._s(_vm.selectEmailKey)+\" \")])]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return _vm.deleteStudent(_vm.selectCourseName, _vm.selectEmailKey)}}},[_vm._v(\"Delete Student\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"editStudent\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(2),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.editStudentName),expression:\"editStudentName\"}],attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.editStudentName)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.editStudentName=$event.target.value}}}),_vm._v(\" \"),_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.editStudentEmail),expression:\"editStudentEmail\"}],attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.editStudentEmail)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.editStudentEmail=$event.target.value}}})]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primary\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return _vm.editStudent(_vm.editStudentId, _vm.editStudentEmail, _vm.editStudentName)}}},[_vm._v(\"Update Details\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")])])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal fade\",attrs:{\"id\":\"editCourse\",\"tabindex\":\"-1\",\"role\":\"dialog\",\"aria-labelledby\":\"exampleModalLabel\",\"aria-hidden\":\"true\"}},[_c('div',{staticClass:\"modal-dialog\",attrs:{\"role\":\"document\"}},[_c('div',{staticClass:\"modal-content\"},[_vm._m(3),_vm._v(\" \"),_c('div',{staticClass:\"modal-body\"},[_c('div',{staticClass:\"container-fluid\"},[_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\" col-md-6\"},[_vm._v(\"\\r\\n        Start Date: \")]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-6\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.courseInfo.Startdate),expression:\"courseInfo.Startdate\"}],staticClass:\"form-control\",attrs:{\"type\":\"date\",\"id\":\"startDate\"},domProps:{\"value\":(_vm.courseInfo.Startdate)},on:{\"change\":_vm.changeEndDate,\"input\":function($event){if($event.target.composing){ return;_vm.$set(_vm.courseInfo, \"Startdate\", $event.target.value)}}})])]),_vm._v(\" \"),_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\" col-md-6\"},[_vm._v(\"\\r\\n        End Date: \")]),_c('div',{staticClass:\"col-md-6\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.courseInfo.Enddate),expression:\"courseInfo.Enddate\"}],staticClass:\"form-control\",attrs:{\"type\":\"date\",\"id\":\"endDate\",\"disabled\":true},domProps:{\"value\":(_vm.courseInfo.Enddate)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.$set(_vm.courseInfo, \"Enddate\", $event.target.value)}}})])]),_vm._v(\" \"),_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\" col-md-6\"},[_vm._v(\"\\r\\n        Start Survey URL: \")]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-6\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.courseInfo.PreSurveyURL),expression:\"courseInfo.PreSurveyURL\"}],staticClass:\"form-control\",attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.courseInfo.PreSurveyURL)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.$set(_vm.courseInfo, \"PreSurveyURL\", $event.target.value)}}})])]),_vm._v(\" \"),_c('div',{staticClass:\"row\"},[_c('div',{staticClass:\" col-md-6\"},[_vm._v(\"\\r\\n        End Survey URL: \")]),_vm._v(\" \"),_c('div',{staticClass:\"col-md-6\"},[_c('input',{directives:[{name:\"model\",rawName:\"v-model\",value:(_vm.courseInfo.PostSurveyURL),expression:\"courseInfo.PostSurveyURL\"}],staticClass:\"form-control\",attrs:{\"type\":\"text\"},domProps:{\"value\":(_vm.courseInfo.PostSurveyURL)},on:{\"input\":function($event){if($event.target.composing){ return;_vm.$set(_vm.courseInfo, \"PostSurveyURL\", $event.target.value)}}})])])])]),_vm._v(\" \"),_c('div',{staticClass:\"modal-footer\"},[_c('button',{staticClass:\"btn btn-primart\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\"}},[_vm._v(\"Cancel\")]),_vm._v(\" \"),_c('button',{staticClass:\"btn btn-danger\",attrs:{\"type\":\"button\"},on:{\"click\":function($event){return _vm.editCourse(_vm.courseInfo._id)}}},[_vm._v(\"Edit Course\")])])])])])])}\n| var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',{staticClass:\"thead-dark\"},[_c('tr',[_c('th',[_c('h4',[_c('u',[_vm._v(\"Email\")])])]),_vm._v(\" \"),_c('th',[_c('h4',[_c('u',[_vm._v(\"Name\")])])]),_vm._v(\" \"),_c('th',[_c('h4',[_c('u',[_vm._v(\"CodeWord\")])])]),_vm._v(\" \"),_c('th',[_c('h4',[_c('u')])]),_vm._v(\" \"),_c('th',[_c('h4',[_c('u')])])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"exampleModalLabel\"}},[_vm._v(\"Delete Student\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"exampleModalLabel\"}},[_vm._v(\"Edit Student\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:\"modal-header\"},[_c('h5',{staticClass:\"modal-title\",attrs:{\"id\":\"exampleModalLabel\"}},[_vm._v(\"Edit Course\")]),_vm._v(\" \"),_c('button',{staticClass:\"close\",attrs:{\"type\":\"button\",\"data-dismiss\":\"modal\",\"aria-label\":\"Cancel\"}},[_c('span',{attrs:{\"aria-hidden\":\"true\"}},[_vm._v(\"×\")])])])}]\n| var esExports = { render: render, staticRenderFns: staticRenderFns }");

/***/ }),
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return store; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Vuex__ = __webpack_require__(113);



__WEBPACK_IMPORTED_MODULE_0_Vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_Vuex__["a" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_Vuex__["a" /* default */].Store({
  state: {
    role: 'student'
  }
});

/***/ }),
/* 112 */,
/* 113 */,
/* 114 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 115 */,
/* 116 */,
/* 117 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[28]);
//# sourceMappingURL=app.be624298ec55a6806eee.js.map