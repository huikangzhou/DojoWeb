dojo.provide("cloudburst.widget.Pagination");

dojo.require("dojo.cache");
dojo.require("cloudburst.widget.Widget");

dojo.declare("cloudburst.widget.Pagination", [cloudburst.widget.Widget], {
	// summary:
	//		Pagination widget for DataGrid
	// description:
	//		This is a pagination widget for datagrid, show total number of records
	//		and publish a event named gridId+"/PageNumber/Changed" with the current page number when change page number
	// example:
	// |	var datagrid = new com.ibm.cio.DataGrid();
	// |	var pagination = new com.ibm.cio.Pagination({targetGrid:datagrid});
	// Or
	// |	var datagrid = new com.ibm.cio.DataGrid({id:"grid1"});
	// |	var pagination = new com.ibm.cio.Pagination({gridId:"grid1"});
    
	// gridId: String
	//		The id of target datagrid of this pagination. 
	//		If this value is null, will use the id attribute of targetGrid
	gridId: null,
	
	// targetGrid: DataGrid
	//		The target datagrid of this pagination
	targetGrid: null,
	
	// numberOfPagesCanSelect: [const] Int
	//		How many page number will show in the pagination widget, default is 5
	numberOfPagesCanSelect: 5,
	
	// _currentPageNo: [private] Int
	//		Current page number, default is 1
	_currentPageNo: 1,
	
	// _numberOfPages: [private] Int
	//		How many pages of the records
	_numberOfPages: 0,
	
	// _startPageNumber: [private] Int
	//		The value of the first page number
	//		For example: it will be 2 when pagination widget show < 2 3 4 5 6 >
	_startPageNumber: 0,
	
	// _endPageNumber: [private] Int
	//		The value of the last page number
	//		For example: it will be 6 when pagination widget show < 2 3 4 5 6 >
	_endPageNumber: 0,
	
	templateString: dojo.cache("cloudburst.widget", "templates/Pagination.html"),
    
	postCreate: function(){
		this.inherited(arguments);
		if(this.targetGrid != null){
			this.gridId = this.targetGrid.attr("id");
		}
		dojo.subscribe(this.gridId + "/NumberOfRecords/Changed", this, "showNumberOfRecords");
		dojo.subscribe(this.gridId + "/NumberOfPages/Changed", this, "setNumberOfPages");
	},
	showNumberOfRecords: function(/*Int*/ totalNumber){
		// summary:
		//		Show total number of records		
		this.totalNum.innerHTML = totalNumber;
	},
	setNumberOfPages: function(numberOfPages){
		// summary:
		//		Set numberOfPages and refresh the display of widget
		this._numberOfPages = numberOfPages;
		this._computeStartAndEndPageNumber();
		this.displayPagesNumber();
	},
	_computeStartAndEndPageNumber: function(){
		// summary:
		//		Compute the start and end page number with _currentPageNo/_numberOfPages/numberOfPagesCanSelect 
		// tags:
		//		private
		if(this._numberOfPages < this.numberOfPagesCanSelect){
			this._startPageNumber = 1;
			this._endPageNumber = this._numberOfPages;
		}else if(this._currentPageNo + (this.numberOfPagesCanSelect-1)/2 > this._numberOfPages){
			this._endPageNumber = this._numberOfPages;
			this._startPageNumber = this._endPageNumber - this.numberOfPagesCanSelect + 1;
		}else{
			if(this._currentPageNo - (this.numberOfPagesCanSelect-1)/2 > 0){
				this._startPageNumber = this._currentPageNo - (this.numberOfPagesCanSelect-1)/2;
				this._endPageNumber = this._currentPageNo + (this.numberOfPagesCanSelect-1)/2;
			}else{
				this._startPageNumber = this._currentPageNo;
				this._endPageNumber = this._startPageNumber + this.numberOfPagesCanSelect - 1;
			}
		}
	},
	displayPagesNumber: function(){
		// summary:
		//		Display the page number part of pagination widget
		// description:
		//		Show page numbers and change the style of First/Prev/Next/Last button according currentPageNo
		for(var i = 0; i < this.pageNavBar.children.length; i++){
			var item = this.pageNavBar.children[i];
			if(dojo.hasClass(item, "page-number")){
				dojo.destroy(item);
			}
		}
		for(var j = this._endPageNumber; j >= this._startPageNumber; j--){
			var li = this._createPageItem(j);
			(j == this._currentPageNo)?dojo.addClass(li, "current-page"):dojo.removeClass(li, "current-page");
		}
		if(this._currentPageNo == 1){
			dojo.addClass(this.firstPageButton, "disabled");
			dojo.addClass(this.prePageButton, "disabled");
		}else{
			dojo.removeClass(this.firstPageButton, "disabled");
			dojo.removeClass(this.prePageButton, "disabled");
		} 
		if(this._currentPageNo == this._numberOfPages){
			dojo.addClass(this.nextPageButton, "disabled");
			dojo.addClass(this.lastPageButton, "disabled");
		}else{
			dojo.removeClass(this.nextPageButton, "disabled");
			dojo.removeClass(this.lastPageButton, "disabled");
		}
	},
	_createPageItem: function(pageNo){
		// summary:
		//		Create a single page number item
		// tags:
		//		private
		var that = this;
		var li = dojo.create("li",{
			"class": "page-number",
			innerHTML: pageNo
		},that.prePageButton,"after");
		if(pageNo != this._currentPageNo){
			dojo.connect(li, "onClick", null, function(){
				that.selectPage(pageNo);
			});
		}
		return li;
	},
	selectPage: function(pageNo){
		// summary:
		//		Select one page number
		// description:
		//		Select a page nubmer, change the display of widget and publish the PageNumber/Changed event
		this._currentPageNo = pageNo;
		this._computeStartAndEndPageNumber();
		this.displayPagesNumber();
		dojo.publish(this.gridId + "/PageNumber/Changed", [pageNo]);
	}
});