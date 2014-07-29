/*
* Adapt
* License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
* Maintainers - Daryl Hedley <darylhedley@gmail.com>
*/

define(function(require) {

    var AdaptModel = require('coreModels/adaptModel');
    var Adapt = require('coreJS/adapt');

    var ContentObjectModel = AdaptModel.extend({

        getCompletionAsPercentage: function() {
            var hasOptionalChildren = this.getChildren().findWhere({_isOptional:true});
            //var completedChildrenAsPercentage = (this.get('_type') != 'menu' || allChildrenMandatory) ? this.getCompleteComponentsAsPercentage() : this.getCompleteChildrenAsPercentage();
            var completedChildrenAsPercentage = (this.get('_type') == 'menu') ? this.getCompleteChildrenAsPercentage() : this.getCompleteComponentsAsPercentage();

            this.set({'completedChildrenAsPercentage': completedChildrenAsPercentage});
            return completedChildrenAsPercentage; 
        },

        getCompleteChildrenAsPercentage: function() {

            var totalChildren = this.findDescendants('components').length;
            var completedChildren = 0;

            this.getChildren().each(function (child) {
                //var completedChildren = 0;
                var children = child.findDescendants('components');
                var availableChildren = new Backbone.Collection(children.where({_isAvailable:true}));
                //var hasOptionalChildren = availableChildren.findWhere({_isOptional:true});
                //var allChildrenOptional = availableChildren.where({_isOptional:false});
                console.log(completedChildren);

                completedChildren += (child.get('_isComplete')) ? availableChildren.length : (child.getCompleteComponentsAsPercentage() / 100) * availableChildren;
            }, this);

            var completedChildrenAsPercentage = (completedChildren / totalChildren) * 100;
            
            return completedChildrenAsPercentage;
        },

        getCompleteComponentsAsPercentage: function() {
            var children = this.findDescendants('components');
            var availableChildren = new Backbone.Collection(children.where({_isAvailable:true}));
            var hasOptionalChildren = availableChildren.findWhere({_isOptional:true});
            var allChildrenOptional = availableChildren.where({_isOptional:false});
            var completedChildren = (!hasOptionalChildren || allChildrenOptional) ? availableChildren.where({_isComplete:true}) : availableChildren.where({_isComplete:true, _isOptional:false});
            var completedChildrenAsPercentage = (completedChildren.length / availableChildren.length) * 100;
            
            return completedChildrenAsPercentage;
        },
    	
    	_parent:'course',
    	_siblings:'contentObjects',
        _children: 'contentObjects'
    });
    
    return ContentObjectModel;

});