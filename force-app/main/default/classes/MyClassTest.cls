@isTest
public class MyClassTest {
    @isTest
static void testDummyMethod() {
Test.startTest();
    String strResp = MyClass.dummyMethod();
Test.stopTest();
System.assertEquals(strResp, 'someString');
                }
}
