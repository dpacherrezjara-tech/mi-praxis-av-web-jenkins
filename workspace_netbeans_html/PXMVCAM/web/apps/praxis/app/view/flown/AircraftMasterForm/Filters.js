Ext.define('Ext.Praxis.view.flown.AircraftMasterForm.Filters', {
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
                padding: '5 1',
                anchor: '100%'
            },
            items: [
                {
                    xtype:'combo',
                    fieldLabel: '<strong>Search By</strong>',
                    store: Ext.create('Ext.Praxis.store.flown.AircraftMaster.SearchBy'),
                    id: prototype.id + '-cbxFiltro',
                    labelAlign:'left',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    editable: false,
                    value: "",
                    valueField: 'code', displayField: 'name',
                    labelWidth: 75,
                    labelClsExtra: 'prx-label-search',
                    width: 212,
                    listeners:{
                        change: 'cbxFiltro_clickHandler'
                    }
                },
                {xtype: 'tbspacer', width: 7},
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCampo',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    hidden: true,
                    maskRe: /[a-zA-Z0-9]/,
                    width: 180,
                    enableKeyEvents: true,
                    listeners:{
                        afterrender: function (cmp, eOpts) {
                            cmp.inputEl.dom.maxLength=10;
                        },
                        change: 'onUpperValue',
                        keypress: 'onTextKeypress'
                    }
                }
            ]
        }
    ]
});

