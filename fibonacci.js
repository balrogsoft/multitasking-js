function* fibonacci(task) {
    var fn1 = 1;
    var fn2 = 1;
    while (true) {
        // Insert a delay to show the processing
        for (j = 0; j < 10000; j++) {
        };
        var value = fn2;
        fn2 = fn1;
        fn1 = fn1 + value;
        
        task._debugLayer.innerHTML = "priority: "+ task.Priority + " / result: " + value;
        
        // If Switch() is true, the task must sleep with yield generator
        if (task.Switch())
            yield value;
        
        // The task ends when the result is infinity
        if (value == Infinity)
            break;
    }
}
	