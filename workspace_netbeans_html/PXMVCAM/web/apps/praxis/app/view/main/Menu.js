
/* global urlPRAXIS */

/**
 * @author: remicioluis
 * @site: remicioluis.com
 */

Ext.define('Ext.Praxis.view.main.Menu',{
    extend: 'Ext.Component',
    alias: 'widget.menu',
    id: 'menu-main',
    listeners:{
        render: function(obj){

            var me = this;

            var cmp = obj;

            Ext.Ajax.request({
                url: urlPRAXIS + '/scripts/praxis/app/data/menu.json',
                params:{},
                scope: this,
                success: function(response, options){
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;

                    //console.log(res);

                    var html = '<nav class="cd-side-nav"><ul>';
                    Ext.Object.each(res, function(index, value){
                        html+= '<li><a id="menu-item-' + Ext.String.trim(value.men_url) + '" href="'+ urlPRAXIS +'/Dashboard#' + Ext.String.trim(value.men_url) + '">' + Ext.String.trim(value.men_name) + '</a></li>';
                    });
                    html+= '</ul></nav>';
                    cmp.update(html);

                    this.applyListeners();
                }
            });

        }
    },
    html: '<div id="xdiv-menu-contenedor"></div>',

    applyListeners: function(){
        var elements = Ext.dom.Query.select('.cd-side-nav > ul > li > a');
        Ext.Object.each(elements, function(index, value){
            value.addEventListener('click', function(e){
                var elements = Ext.dom.Query.select('.cd-side-nav > ul > li > a');
                Ext.Object.each(elements, function(index, value){
                    Ext.get(value).removeCls('active');
                });
                Ext.get(e.target).addCls('active');
            });
        }, this);

        var hash = window.location.hash.split('#');

        if ( hash.length > 1 ){
            Ext.get('menu-item-' + hash[1]).addCls('active');
        }

    },

    evtState: function(){
        var elements = Ext.dom.Query.select('.cd-side-nav > ul > li > a');
        Ext.Object.each(elements, function(index, value){
            Ext.get(value).removeCls('active');
        });
    }

});
