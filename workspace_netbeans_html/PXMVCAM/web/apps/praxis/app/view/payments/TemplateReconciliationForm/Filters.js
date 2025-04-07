Ext.define('Ext.Praxis.view.payments.TemplateReconciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'vbox',
    defaults: {
        width: '100%'
    },
    items: [
        {
            xtype: 'container',
            layout: 'hbox', // Primera fila de filtros
            padding: '10px 15px',
            items: [
                
                {xtype: 'tbspacer', width: 10, height:20},
                
                {xtype: 'tbspacer', width: 10, height:20},
                
                {xtype: 'tbspacer', width: 10, height:20},
                
                {xtype: 'tbspacer', width: 10, height:20},
                //<editor-fold defaultstate="collapsed" desc="filtersValidation">
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCOREP',
                    fieldLabel: 'Processor',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 240,
                    labelWidth: 68,
                    emptyText: 'All',
                    value: [],  
                    displayField: 'NAME',
                    valueField: 'VALUE',
                    queryMode: 'local',
                    filterPickList: true,
                    editable: true,
                    forceSelection: true
                },
                {xtype: 'tbspacer', width: 10, height:20},
                {
                    fieldLabel: 'Avianca Group',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 190,
                    labelWidth: 95,
                    xtype: 'combo', 
                    id: prototype.id + '-typeClient',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    listConfig: {maxHeight: 130},
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    value: '134',
                    store: {
                        fields: ['code', 'name'],
                        data: [
                            {code: '133', name: 'LACSA'},
                            {code: '134', name: 'AVIANCA'},
                            {code: '202', name: 'TACA'},
                            {code: '547', name: 'AEROGAL'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
                //</editor-fold>
            ]
        }
    ]
});
