@isTest
public class BackendClassTest {
    @isTest
    public static void testMethod1() {
        Test.startTest();
        String str = BackendCLass.methodName();
        Test.stopTest();
        System.assertEquals(str, 'Histasdory Log');
    }
}
