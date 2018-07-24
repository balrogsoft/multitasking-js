function Task ()
{
    this.Priority = 1;
    
    // private variables
    
    this._debugLayer = "";
    this._sliceStart = 0;
    this._slice = 0;
    
    this._TaskSwitcher = null;

	// private method
	this._switcher = function*() {
		while (true) {
		    if ((new Date() - this._sliceStart) >= this._slice) {
		        yield true;
		        this._sliceStart = new Date();
		    }  
		    yield false;
		}
	};
}

Task.prototype.SetTaskPri = function(pri) {
    this.Priority = pri;
    // The slice task time in ms is priority*4
    this._slice = pri<<2;
};

Task.prototype.addProc = function(proc) {
    this._sliceStart = new Date();
    this._TaskSwitcher = this._switcher();
    this._fn = proc;
    return this;
};

// Return true when a task must sleep
Task.prototype.Switch = function() {
    return this._TaskSwitcher.next().value;
};

