$(document).ready(function() {
  let addButton = $(".add-button");
  let field = $(".add-field");
  let tasks = $(".tasks");
  let addBlock = $(".add-block");
  let todoHeader = $(".todo-header");
  let listCount = 3;

  // Add task
  function addAlist() {
    let elem = `<li class="task">
    <div class="task-checked col-1">
      <input type="checkbox" />
    </div>
    <div class="task-text col-2">
      ${field.val()}
    </div>
    <div class="task-remove col-3"></div>
  </li>`;

    let isValid = false;

    //Checks to see if there's an empty space submitted
    for (let i = 0; i < field.val().length; i++) {
      if (field.val()[i] === "" || field.val()[i] === " ") {
        isValid = false;
      } else {
        isValid = true;
        i = field.val().length;
      }
    }

    //Performs the actions of either submitting or rejecting
    if (isValid === false) {
      alert("Please enter some text first");
    } else if (isValid) {
      tasks.append(elem);
      field.val("");
      listCount++;
      console.log(listCount);
    }

    //Changes the CSS if there are list items
    if (listCount !== 0) {
      field.removeClass("only-1");
      addButton.removeClass("only-2");
      addBlock.removeClass("only-3");
    }
  }

  field.on("keypress", function(e) {
    if (e.which === 13) {
      addAlist();
    }
  });

  addButton.on("click", function() {
    addAlist();
  });

  //Remove class
  tasks.on("click", ".task-remove", function() {
    $(this)
      .parent()
      .remove();

    listCount--;
    console.log(listCount);

    //Changes the CSS if there's no list items
    if (listCount === 0) {
      field.addClass("only-1");
      addButton.addClass("only-2");
      addBlock.addClass("only-3");
    }
  });

  //Checked
  tasks.on("change", ".task-checked input", function() {
    $(this)
      .parent()
      .next()
      .toggleClass("checked");
  });

  //Sortable
  $("#tasks-list").sortable();

  //Dragable function without jQuery Ui
  (function($) {
    $.fn.drags = function(opt) {
      opt = $.extend({ handle: "", cursor: "move" }, opt);

      if (opt.handle === "") {
        var $el = this;
      } else {
        var $el = this.find(opt.handle);
      }

      return $el
        .css("cursor", opt.cursor)
        .on("mousedown", function(e) {
          if (opt.handle === "") {
            var $drag = $(this)
              .parent()
              .addClass("draggable");
          } else {
            var $drag = $(this)
              .addClass("active-handle")
              .parent()
              .addClass("draggable");
          }
          var z_idx = $drag.css("z-index"),
            drg_h = $drag.outerHeight(),
            drg_w = $drag.outerWidth(),
            pos_y = $drag.offset().top + drg_h - e.pageY,
            pos_x = $drag.offset().left + drg_w - e.pageX;
          $drag
            .css("z-index", 1000)
            .parents()
            .on("mousemove", function(e) {
              $(".draggable")
                .offset({
                  top: e.pageY + pos_y - drg_h,
                  left: e.pageX + pos_x - drg_w
                })
                .on("mouseup", function() {
                  $(this)
                    .removeClass("draggable")
                    .css("z-index", z_idx);
                });
            });
          //Disable selection, in a comment because I didn't need it however it's useful to have
          //   e.preventDefault();
        })
        .on("mouseup", function() {
          if (opt.handle === "") {
            $(this).removeClass("draggable");
          } else {
            $(this)
              .removeClass("active-handle")
              .parent()
              .removeClass("draggable");
          }
        });
    };
  })(jQuery);

  //Initiating draggable
  todoHeader.drags();
});
