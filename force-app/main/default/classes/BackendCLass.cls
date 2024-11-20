public with sharing class BackendCLass {
    private String var;
    public BackendCLass() {
        this.var = 'init';
    }

    @AuraEnabled
    public static string methodName() {
        try {
            String label1 = System.label.bbc_aas_confirm_full_ad_msg;
            return label1;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
