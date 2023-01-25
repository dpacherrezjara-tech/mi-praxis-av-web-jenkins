Ext.define('Ext.Praxis.view.sales.RegionsMasterFileForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                { xtype: 'tbspacer', width: 7 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Search By: </strong>',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype:'combo',
                    store: Ext.create('Ext.Praxis.store.sales.RegionsMasterFile.SearchBy'),
                    id: prototype.id + '-cbxFiltro',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 120,
                    hidden: false,
                    hiddenLabel: false,
                    listeners:{
//                        afterrender: 'onCmbSearchAfterRender',
                        change: 'onCmbFiltroChange'
                    }
                },
                { xtype: 'tbspacer', width: 25 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Type: </strong>',
                    id: prototype.id + '-lbTipo',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype:'combo',
                    store: Ext.create('Ext.Praxis.store.sales.RegionsMasterFile.Type'),
                    id: prototype.id + '-cbxTipo',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 120,
                    hidden: false,
                    hiddenLabel: false,
//                    listeners:{
////                        afterrender: 'onCmbSearchAfterRender',
//                        change: 'onCmbTypeChange'
//                    }
                },
                { xtype: 'tbspacer', width: 25 },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Code: </strong>',
                    id: prototype.id + '-lbCodigo',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCodigo',
                    fieldStyle: 'text-align:center',
                    width: 115,
//                    enableKeyEvents: true,
//                    listeners:{
//                        change: 'onSearchTextChange',
//                        keypress: 'onSearchTextKeypress'
//                    },
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                },
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Country Code: </strong>',
                    id: prototype.id + '-lbCodPais',
                    align: 'center'
                },
                { xtype: 'tbspacer', width: 15 },
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCodPais',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
//                    enableKeyEvents: true,
//                    listeners:{
//                        change: 'onSearchTextChange',
//                        keypress: 'onSearchTextKeypress'
//                    },
                    listeners:{
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                }
            ]
        }
    ]
});

