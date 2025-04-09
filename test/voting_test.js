const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
    let votingInstance;

    before(async () => {
        votingInstance = await Voting.deployed();
    });

    it("should initialize with two candidates", async () => {
        const count = await votingInstance.candidatesCount();
        assert.equal(count, 2, "Incorrect number of candidates");
    });

    it("should allow a user to vote", async () => {
        const candidateId = 1;
        await votingInstance.vote(candidateId, { from: accounts[0] });
        const candidate = await votingInstance.getCandidate(candidateId);
        assert.equal(candidate[1], 1, "Vote count should increase");
    });

    it("should prevent double voting", async () => {
        const candidateId = 1;
        try {
            await votingInstance.vote(candidateId, { from: accounts[0] });
            assert.fail("Double voting should not be allowed");
        } catch (error) {
            assert.include(error.message, "revert", "Error message must contain 'revert'");
        }
    });
});