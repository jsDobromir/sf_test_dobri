public with sharing class BackendCLass {
    public BackendCLass() {
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
