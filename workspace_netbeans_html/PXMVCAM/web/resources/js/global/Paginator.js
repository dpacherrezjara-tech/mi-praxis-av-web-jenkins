/**
 * @author: remicioluis
 * --------------------
 * Genera un paginador personalizado
 */

Ext.define('Ext.global.Paginator',{
    extend: 'Ext.Container',
    alias: 'widget.Paginator',
    config: {
        border:true,
        defaults:{
            style: 'padding: 4px; margin: 1px;',
            border:false
        }
    },
    constructor: function(config){

        // console.log(config.store);

        var me = this;
        me.config_=config;
        me.id=config.id;  

        me.items = [
            {
                xtype: 'pagingtoolbar',
                id: me.id + '-pagging',
                pageSize: 10,
                displayInfo: false,
                storeId: config.store !== undefined ? config.store : '',
                hidden: true
            },
            {
                xtype: 'button',
                id: me.id + '-btn-pag-first',
                iconCls: 'prx-icon-pagination-first',
                tooltip: 'First Page',
                flex: 1
            },
            {
                xtype: 'button',
                id: me.id + '-btn-pag-previous',
                iconCls: 'prx-icon-pagination-previous',
                tooltip: 'Previous Page',
                flex: 1
            },
            {
                xtype: 'button',
                id: me.id + '-btn-pag-next',
                iconCls: 'prx-icon-pagination-next',
                tooltip: 'Next Page',
                flex: 1
            },
            {
                xtype: 'button',
                id: me.id + '-btn-pag-last',
                iconCls: 'prx-icon-pagination-last',
                tooltip: 'Last Page',
                flex: 1
            }
        ];

        me.listeners = {
            afterRender: function(obj, e){
                Ext.ComponentQuery.query('#' + me.id + '-btn-pag-first')[0].on('click', function(obj){
                    me.getInfoPag('first');
                });
        
                Ext.ComponentQuery.query('#' + me.id + '-btn-pag-previous')[0].on('click', function(obj){
                    me.getInfoPag('previous');
                });
        
                Ext.ComponentQuery.query('#' + me.id + '-btn-pag-next')[0].on('click', function(obj){
                    me.getInfoPag('next');
                });
        
                Ext.ComponentQuery.query('#' + me.id + '-btn-pag-last')[0].on('click', function(obj){
                    me.getInfoPag('last');
                });

                Ext.getCmp(me.id + '-pagging').on('change', me.onPagingChange, this);
            }
        }

        me.callParent();
    },

    setStore: function(store){
        var me = this;
        Ext.getCmp(me.id + '-pagging').setStore(store);
    },

    getInfoPag: function(action){
        var me = this;
        var pag = Ext.getCmp(me.id + '-pagging');

        var pagData = pag.getPageData();
        switch(action){
            case 'first': pag.moveFirst(); break;
            case 'previous': pag.movePrevious(); break;
            case 'next': pag.moveNext(); break;
            case 'last': pag.moveLast(); break;
        }

        if ( me.config_.pagInfo.length > 0 ){
            Ext.each(me.config_.pagInfo, function(value, index){
                if ( index === 0 )
                    Ext.getCmp(value).setText(pagData.currentPage);
                if ( index === 1 )
                    Ext.getCmp(value).setText(pagData.pageCount);
                if ( index === 2 )
                    Ext.getCmp(value).setText(Ext.util.Format.number( pagData.total,'0,000'));
            });
        }
    },

    onPagingChange: function(obj, pageData, eOpts){
        var me = this;
        me.getInfoPag('');
    },

    getCmpPaginator: function(){
        var me = this;
        return Ext.getCmp(me.id + '-pagging')
    }

});