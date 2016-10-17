console.log('wired up!')
console.log($)


var forEach = function(arr, cb){
  for(var i = 0 ; i < arr.length; i+=1){
     cb(arr[i], i, arr)
  }
}



var router = function(){
  var selectedUser = window.location.hash.slice(1)

  if(selectedUser.length === 0){
     showHomePage()
     return
  }

  console.log( selectedUser )
  showUserShowsPage(selectedUser)
}

var showHomePage = function(){
  var bigStr = '<div class="row text-left users-container">'
      bigStr += "<h1>Who's Watching?</h1>"
      bigStr += '<a href="#">'
      bigStr += '<i class="fa fa-home fa-2x"' + 'aria-hidden="true"></i>'
      bigStr += '</a>'
      for(var propKey in userList ){

         console.log()
         bigStr += '<div class="col-xs-6 col-sm-3 text-center user-name">'
         bigStr +=     '<a href="#'+propKey+'">'
         bigStr +=        '<img src="https://flathash.com/' + propKey +'" alt="">'
         bigStr +=        '<h3>'+ userList[propKey].username +'</h3>'
         bigStr +=     '</a>'
         bigStr += '</div>'
      }

      bigStr +='</div>'
      appContainer.innerHTML = bigStr
}

var showUserShowsPage = function(usr){
  var userObj = userList[usr]

  var bigHTMLStr ='<a href="#">'
      bigHTMLStr += '<i class="fa fa-home fa-2x"' + 'aria-hidden="true"></i>'
      bigHTMLStr +=  '</a>'
      bigHTMLStr += '<h2 class="user-prof text-left">'+ userObj.username + '\'s Shows </h2>'
      bigHTMLStr += '<div class="row shows-list"></div>'



      appContainer.innerHTML = bigHTMLStr


  var firstShowId = userObj.showIds[0]
  console.log('.showId[0]', firstShowId )

  forEach(userObj.showIds, function(elementIdNum){


   $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum ).then(function(dataResponse){



      var showsListContainerEl = document.querySelector('.shows-list')

      var showStr = '<div class="col-sm-3">'
          showStr +=    "<img src='" + dataResponse.image.medium  + "'>"
          showStr +=    "<h4>" + dataResponse.name  + "</h4>"
          showStr += '</div>'

      showsListContainerEl.innerHTML += showStr

   })

})

}




var userList = {
  matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
  ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
  michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
  justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}


var appContainer = document.querySelector('#app-container')





window.addEventListener('hashchange', router )
router()
